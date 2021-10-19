import { useState, useEffect } from 'react';

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import app from './firebase';

const auth = getAuth(app);

export default function Login() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithFirebase = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error(err);
    }
  };

  const logOff = async () => {
    signOut(auth).then(clear);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthUser(null);
        setLoading(false);
        return;
      }

      const userObj = {
        uid: user.uid,
        email: user.email,
      };
      setLoading(true);
      setAuthUser(userObj);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithFirebase,
    logOff,
  };
}
