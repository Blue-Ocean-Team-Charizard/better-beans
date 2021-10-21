import { useAuth } from '../../firebase/auth_context';
import Meta from '../../components/Meta';
import LoginPageID from '../../components/AddLoginId';
import GoogleSignIn from '../../components/GoogleSignIn'
import FacebookSignIn from '../../components/FacebookSignIn'
import GithubSignIn from '../../components/GithubSignIn'

export default function LoginPage() {
  const { signInWithFirebase, signInWithFacebook, signInWithGithub } = useAuth();
  return (
    <>
      <Meta />
      <LoginPageID />
      <div className="login-btn-container">
        <div id="login">
          <p>Sign up today to save your better <br /> and best beans</p>
          <GoogleSignIn />
          <FacebookSignIn />
          <GithubSignIn />
        </div>
      </div>
    </>
  );
}
