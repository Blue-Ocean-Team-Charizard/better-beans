import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
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
      await signInWithPopup(auth, new GoogleAuthProvider())
        .then((results)=>console.log(results));
    } catch (err) {
      console.error(err);
    }
    // .then((results) => console.log(results));
  };

  const logOff = async () => {
    signOut(auth).then(clear);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        setAuthUser(null);
        setLoading(false);
        return;
      }
      console.log('authUser', authUser);
      const userObj = {
        uid: authUser.uid,
        email: authUser.email,
      };
      setLoading(true);
      setAuthUser(userObj);
      setLoading(false);
      console.log('userObj', userObj);
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
