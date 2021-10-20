import { useAuth } from '../../firebase/auth_context';

export default function LoginPage() {
  const { signInWithFirebase } = useAuth();
  return (
    <button
      type="button"
      className="google-btn-container"
      onClick={signInWithFirebase}
    >
      <div className="google-btn">
        <img
          className="google-logo"
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
          alt="google"
          width="25px"
          height="25px"
        />
        <h3 className="google-signin">
          Continue with Google
        </h3>
      </div>
    </button>
  );
}
