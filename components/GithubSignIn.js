import { useAuth } from '../firebase/auth_context';

export default function GithubSignIn() {
  const { signInWithGithub } = useAuth();
  return (
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
  )
}