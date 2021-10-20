import { useAuth } from '../../firebase/auth_context';

export default function LoginPage() {
  const { signInWithFirebase, logOff } = useAuth();
  return (
    <div id="login">
      <p>Sign up today to save your better <br /> and best beans</p>
      <button className="btn btn-google"
        type="button"
        onClick={signInWithFirebase}
        >
        Sign In With Google
      </button>
      <div>
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
