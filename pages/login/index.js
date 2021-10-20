import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';

export default function LoginPage() {
  const { signInWithFirebase, logOff } = useAuth();
  return (
    <div className="container">
      <Meta />
      <div className="container">
        <h1>Login page</h1>
        <button
          type="button"
          onClick={signInWithFirebase}
        >
          Click Me!
        </button>
        <button
          type="button"
          onClick={logOff}
        >
          Log Off!
        </button>
      </div>
    </div>
  );
}
