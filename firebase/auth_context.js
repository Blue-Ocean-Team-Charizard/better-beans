/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import Login from './login';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithFirebase: async () => {},
  logOff: async () => {},
  deleteAccount: async () => {},
  signInWithFacebook: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = Login();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);
