import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import app from '../../firebase/firebase';


export default function Login() {
  const SignInWithFirebase = async () => {
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      .then(results=>console.log(results));
    } catch (err) {
      console.error(err);
    }
      // .then((results) => console.log(results));
  };
  return (
    <div className="container">
      <Header />
      <div className="container">
        Login Page
        <button onClick={SignInWithFirebase}></button>
      </div>
      <Footer />
    </div>
  );
}
