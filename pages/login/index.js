import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';

export default function LoginPage() {
  const { signInWithFirebase, signInWithFacebook, signInWithGithub } = useAuth();
  return (
    <>
      <Meta />
      <div id="login">
        <p>Sign up today to save your better <br /> and best beans</p>
        <button
          type="button"
          className="google-btn-container btn btn-google"
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
        <button type="button" className="facebook-btn" onClick={signInWithFacebook}>Continue with Facebook</button>
        <button type="button" className="github-btn" onClick={signInWithGithub}>Continue with Github</button>
      </div>
    </>
  );
}
