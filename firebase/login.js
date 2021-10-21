import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
  FacebookAuthProvider,
} from 'firebase/auth';

import app from './firebase';

const auth = getAuth(app);

export default function Login() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signInWithFirebase = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error(err);
    } finally {
      router.push('/');
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      console.error(err);
    } finally {
      router.push('/');
    }
  };

  const logOff = async () => {
    signOut(auth).then(clear);
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    try {
      await deleteUser(user)
        .then(() => {
          console.log('Successfully deleted user');
        });
    } catch (err) {
      console.error(err);
    } finally {
      router.push('/login');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthUser(null);
        setLoading(false);
        return;
      }
      // console.log('user', user);
      const userObj = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
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
    deleteAccount,
    signInWithFacebook,
  };
}
