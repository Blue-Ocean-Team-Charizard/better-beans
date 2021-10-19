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
    setLoading(false);
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
      console.log('user', user);
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
  };
}

// accessToken: ""
// auth: AuthImpl {app: FirebaseAppImpl, config: {…}, currentUser: UserImpl, emulatorConfig: null, operations: Promise, …}
// displayName: "Jesus Gonzales"
// email: "jesus.gonzales1995@gmail.com"
// emailVerified: true
// isAnonymous: false
// metadata: UserMetadata {createdAt: '1634605271950', lastLoginAt: '1634678519601', lastSignInTime: 'Tue, 19 Oct 2021 21:21:59 GMT', creationTime: 'Tue, 19 Oct 2021 01:01:11 GMT'}
// phoneNumber: null
// photoURL: "https://lh3.googleusercontent.com/a-/AOh14GhHcB6pb9d6X-t-PxgGHAIf65qeG13Ilx5-ApYevA=s96-c"
// proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
// providerData: [{…}]
// providerId: "firebase"
// reloadListener: null
// reloadUserInfo: {localId: 'hXrl4Id1YxZor9UOywMvI76WF4U2', email: 'jesus.gonzales1995@gmail.com', displayName: 'Jesus Gonzales', photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhHcB6pb9d6X-t-PxgGHAIf65qeG13Ilx5-ApYevA=s96-c', emailVerified: true, …}
// stsTokenManager: StsTokenManager {refreshToken: 'AFxQ4_rltXdvfKbTT9Csg8e4zcVRhCrvcL8qKhJ6PpJ6hS2CLF…2PZ7HnN1-OAwThd3OznUAfrNg5F1RF6kcskOZRjuhf0OfJVHL', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmYmRmMjQxZTdjM2E2NT…EqJ45Dx4KWYosZLFRSV1VHj9w-QaKCOZS6U4R6f4r1AvOZ3FA', expirationTime: 1634682305148}
// tenantId: null
// uid: "hXrl4Id1YxZor9UOywMvI76WF4U2"
