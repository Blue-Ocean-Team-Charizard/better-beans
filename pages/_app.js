import '../styles/globals.css';
import { AuthUserProvider } from '../firebase/auth_context';

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>;
}

export default MyApp;
