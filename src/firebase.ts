import { initializeApp, getApps } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const required = (value: string | undefined, name: string) => {
  if (!value?.trim()) throw new Error(`Missing required configuration: ${name}`);
  return value.trim();
};

const config = {
  apiKey: required(import.meta.env.VITE_FIREBASE_API_KEY, "VITE_FIREBASE_API_KEY"),
  authDomain: required(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: required(import.meta.env.VITE_FIREBASE_PROJECT_ID, "VITE_FIREBASE_PROJECT_ID"),
  appId: required(import.meta.env.VITE_FIREBASE_APP_ID, "VITE_FIREBASE_APP_ID"),
  messagingSenderId: required(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "VITE_FIREBASE_MESSAGING_SENDER_ID"),
};

export const firebaseApp = getApps()[0] ?? initializeApp(config);
const siteKey = required(import.meta.env.VITE_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_SITE_KEY, "VITE_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_SITE_KEY");
initializeAppCheck(firebaseApp, { provider: new ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: true });
export const auth = getAuth(firebaseApp);
export const functions = getFunctions(firebaseApp, "asia-southeast1");
