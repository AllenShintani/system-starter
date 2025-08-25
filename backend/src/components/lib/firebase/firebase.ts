import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";
import { config } from "../../../config/env.config";

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let adminApp: admin.app.App | null = null;

const adminInit = () => {
  if (adminApp) {
    return;
  }
  adminApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
  return adminApp;
};
export { auth, adminInit };
