import * as admin from 'firebase-admin';
export declare const firebaseConfig: {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
};
declare const auth: import("@firebase/auth").Auth;
declare const db: import("@firebase/firestore").Firestore;
declare const adminInit: () => admin.app.App | undefined;
export { auth, db, adminInit };
//# sourceMappingURL=firebase.d.ts.map