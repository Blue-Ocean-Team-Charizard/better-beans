// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, firebaseApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let app = firebaseApp;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB25OfjHii9AVTTV6Nz7pFhBMedOr2wxXI",
  authDomain: "betterbeans-6abd8.firebaseapp.com",
  projectId: "betterbeans-6abd8",
  storageBucket: "betterbeans-6abd8.appspot.com",
  messagingSenderId: "287324513714",
  appId: "1:287324513714:web:e7eee5f82cf0b8515670ab"
};

if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}

export default app;
