import { useAuth } from '../firebase/auth_context';

export default function FacebookSignIn() {
  const { signInWithFacebook } = useAuth();
  return (
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
  )
}