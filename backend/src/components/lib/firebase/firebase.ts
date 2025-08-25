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

const adminAppInstance = {
  app: null as admin.app.App | null,
};

const adminInit = (): admin.app.App => {
  if (adminAppInstance.app) {
    return adminAppInstance.app;
  }
  adminAppInstance.app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
  return adminAppInstance.app;
};
export { auth, adminInit };
