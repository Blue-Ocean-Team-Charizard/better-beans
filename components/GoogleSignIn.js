import { useAuth } from '../firebase/auth_context';

export default function GoogleSignIn() {
  const { signInWithFirebase } = useAuth();
  return (
    <button
      type="button"
      className="btn-google"
      onClick={signInWithFirebase}
    >
      <div className="google-btn">
        <img
          className="google-logo"
          src="/google_logo.png"
          alt="google"
          width="25px"
          height="25px"
        />
        <h3 className="google-signin">
          Continue with Google
        </h3>
      </div>
    </button>
  )
}