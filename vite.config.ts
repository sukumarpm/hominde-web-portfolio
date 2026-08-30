import { defineConfig }    from "vite";
import react               from "@vitejs/plugin-react";
import tailwindcss         from "@tailwindcss/vite";
import type { Connect }    from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Vite dev-server plugin that serves /api/inquiry locally.
 * In production, deploy src/api/inquiryHandler.ts as a serverless function
 * (Vercel API routes, Netlify Functions, Cloudflare Workers, etc.).
 */
function inquiryApiPlugin() {
  return {
    name: "vite-plugin-inquiry-api",
    configureServer(server: { middlewares: { use: (path: string, fn: Connect.HandleFunction) => void } }) {
      server.middlewares.use(
        "/api/inquiry",
        async (req: IncomingMessage, res: ServerResponse) => {
          /* Only handle POST */
          if (req.method !== "POST") {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, message: "Method not allowed." }));
            return;
          }

          /* Read body */
          const chunks: Buffer[] = [];
          req.on("data", (chunk: Buffer) => chunks.push(chunk));
          req.on("end", async () => {
            let body: Record<string, unknown> = {};
            try { body = JSON.parse(Buffer.concat(chunks).toString()); }
            catch { /* ignore parse errors */ }

            /* Import handler (dynamic so env vars load first) */
            const { handleInquiry } = await import("./src/api/inquiryHandler.js");
            const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ?? "127.0.0.1";
            const result = await handleInquiry(body, ip);

            res.writeHead(result.status, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.json));
          });
        }
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inquiryApiPlugin()],
  server: {
    port: 5173,
    open: false,
  },
});
