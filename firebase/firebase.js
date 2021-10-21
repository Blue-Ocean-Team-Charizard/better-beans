/* eslint-disable import/no-mutable-exports */
// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApp,
  getApps,
} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let app;
// Your web app's Firebase configuration
// console.log(env('process.env.NEXT_PUBLIC_FIREBASE_API_KEY'));
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}

export default app;
