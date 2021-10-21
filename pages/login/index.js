import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';
import LoginPageID from '../../components/AddLoginId';

export default function LoginPage() {
  const { signInWithFirebase, signInWithFacebook, signInWithGithub } = useAuth();
  return (
    <>
      <Meta />
      <LoginPageID />
      <div className="login-btn-container">
        <div id="login">
          <p>Sign up today to save your better <br /> and best beans</p>
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


          <button
            type="button"
            className="btn-facebook"
            onClick={signInWithFacebook}
          >
            <div className="facebook-btn">
              <img
                className="facebook-logo"
                src="/facebook_logo.png"
                alt="facebook"
                width="25px"
                height="25px"
              />
              <h3 className="facebook-signin">
                Continue with Facebook
              </h3>
            </div>
          </button>


          <button
            type="button"
            className="btn-github"
            onClick={signInWithGithub}
          >
            <div className="google-btn">
              <img
                className="github-logo"
                src="/github_logo.png"
                alt="github"
                width="25px"
                height="25px"
              />
              <h3 className="github-signin">
                Continue with Github
              </h3>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
