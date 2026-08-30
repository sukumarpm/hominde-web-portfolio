/**
 * inquiryHandler.ts — Hominode /api/inquiry request handler
 *
 * Used by the Vite dev-server plugin and any serverless/edge function adapter.
 * Keeps all email credentials server-side.
 *
 * Rate limiting: simple in-memory map (per IP, 5 req / 15 min window).
 * For production, replace with Redis / Upstash.
 */

import type { InquiryPayload } from "./emailService";
import { sendViaResend, sendViaSendGrid } from "./emailService";

/* ─── Rate limiter (in-memory, resets on server restart) ─────── */
const rateMap = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes
const MAX_PER_IP = 5;

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstAt: now });
    return false;
  }
  if (entry.count >= MAX_PER_IP) return true;
  entry.count++;
  return false;
}

/* ─── Input sanitiser ────────────────────────────────────────── */
function sanitise(s: unknown, maxLen = 500): string {
  if (typeof s !== "string") return "";
  return s.replace(/[<>]/g, "").slice(0, maxLen).trim();
}

/* ─── Server-side validation ─────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

type ValidationResult = { ok: true; payload: InquiryPayload } | { ok: false; message: string };

function validateBody(raw: Record<string, unknown>): ValidationResult {
  const name          = sanitise(raw.name, 100);
  const email         = sanitise(raw.email, 254).toLowerCase();
  const phone         = sanitise(raw.phone, 30);
  const orgName       = sanitise(raw.orgName, 150);
  const communityType = sanitise(raw.communityType, 80);
  const unitCount     = sanitise(raw.unitCount, 30);
  const features      = sanitise(raw.features, 500);
  const message       = sanitise(raw.message, 2000);

  if (!name)                        return { ok: false, message: "Name is required." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, message: "A valid email address is required." };
  if (!phone || !PHONE_RE.test(phone)) return { ok: false, message: "A valid phone number is required." };
  if (!orgName)                     return { ok: false, message: "Organisation name is required." };
  if (!communityType)               return { ok: false, message: "Community type is required." };

  return {
    ok: true,
    payload: { name, email, phone, orgName, communityType, unitCount, features, message },
  };
}

/* ─── Environment helper ─────────────────────────────────────── */
function getEnv() {
  /* Works in Node (process.env) and Cloudflare Workers / Vercel (globalThis) */
  const e = (typeof process !== "undefined" ? process.env : {}) as Record<string, string | undefined>;
  return {
    CONTACT_EMAIL:       e.CONTACT_EMAIL      ?? "hello@hominode.com",
    RESEND_API_KEY:      e.RESEND_API_KEY      ?? "",
    SENDGRID_API_KEY:    e.SENDGRID_API_KEY    ?? "",
    EMAIL_PROVIDER:      e.EMAIL_PROVIDER      ?? "resend",
    EMAIL_FROM_ADDRESS:  e.EMAIL_FROM_ADDRESS  ?? "noreply@hominode.com",
    EMAIL_FROM_NAME:     e.EMAIL_FROM_NAME     ?? "Hominode",
  };
}

/* ─── Main handler ───────────────────────────────────────────── */
export async function handleInquiry(
  body:  Record<string, unknown>,
  ip:    string = "unknown"
): Promise<{ status: number; json: object }> {

  /* 1. Honeypot check */
  if (body._hp) {
    /* Silently accept — don't let bots know they're blocked */
    return { status: 200, json: { ok: true, message: "Inquiry received." } };
  }

  /* 2. Rate limit */
  if (isRateLimited(ip)) {
    return {
      status:  429,
      json:    { ok: false, message: "Too many requests. Please wait a moment and try again." },
    };
  }

  /* 3. Validate */
  const validation = validateBody(body);
  if (!validation.ok) {
    return { status: 400, json: { ok: false, message: validation.message } };
  }
  const { payload } = validation;

  /* 4. Send email */
  const env = getEnv();
  try {
    if (env.EMAIL_PROVIDER === "sendgrid" && env.SENDGRID_API_KEY) {
      await sendViaSendGrid(payload, {
        SENDGRID_API_KEY:   env.SENDGRID_API_KEY,
        CONTACT_EMAIL:      env.CONTACT_EMAIL,
        EMAIL_FROM_ADDRESS: env.EMAIL_FROM_ADDRESS,
        EMAIL_FROM_NAME:    env.EMAIL_FROM_NAME,
      });
    } else if (env.RESEND_API_KEY) {
      await sendViaResend(payload, {
        RESEND_API_KEY:     env.RESEND_API_KEY,
        CONTACT_EMAIL:      env.CONTACT_EMAIL,
        EMAIL_FROM_ADDRESS: env.EMAIL_FROM_ADDRESS,
        EMAIL_FROM_NAME:    env.EMAIL_FROM_NAME,
      });
    } else {
      /* No provider configured — log to server and return success
         so the frontend can fall back to mailto gracefully.       */
      console.warn("[Hominode Inquiry] No email provider configured. Inquiry data:", payload);
      return {
        status: 500,
        json:   { ok: false, message: "Email service not configured." },
      };
    }

    console.info(`[Hominode Inquiry] Sent from ${payload.email} (${payload.orgName})`);
    return { status: 200, json: { ok: true, message: "Inquiry received." } };

  } catch (err) {
    /* Log full error server-side; return generic message to client */
    console.error("[Hominode Inquiry] Email send failed:", err);
    return {
      status: 500,
      json:   { ok: false, message: "We couldn't send your inquiry right now. Please try again in a moment." },
    };
  }
}
