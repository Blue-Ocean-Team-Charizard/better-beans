<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import app from '../../firebase/firebase';
import { useAuth } from '../../firebase/auth_context';
=======
import Meta from "../../components/Meta";
>>>>>>> main

export default function LoginPage() {
  const { signInWithFirebase, logOff } = useAuth();
  return (
<<<<<<< HEAD
    <div className="container">
      <Header />
      <div className="container">
        Login Page
        <button onClick={signInWithFirebase}>Click Me!</button>
        <button onClick={logOff}>Log Off!</button>
      </div>
      <Footer />
=======
    <div>
      <Meta />
      <h1>Login page</h1>
>>>>>>> main
    </div>
  );
}
