import { createContext, useContext, Context } from 'react';
import Login from './google_signin';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithFirebase: async () => {},
  logOff: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = Login();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);
