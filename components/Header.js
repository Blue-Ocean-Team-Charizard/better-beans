import Link from 'next/link';
import Head from 'next/head';
import Search from './Search';
import { SearchContext } from './SearchContext';
import { useAuth } from '../firebase/auth_context';

export default function Header() {
  const { authUser, logOff } = useAuth();
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
        <link href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet" />
        {/* <script src="https://kit.fontawesome.com/02899377c4.js" crossOrigin="anonymous"></script> */}
      </Head>
      <header>
        <div className="navbar navbar-dark shadow-sm">
          <div id="nav">
            <Link href="/">
              <a href="/" aria-label="logo">
                <div className="logo" />
              </a>
            </Link>
            <div className="loginBtn">
              {(authUser) ? (
                <Link href="/profile">
                  <button type="button" className="btn">Profile</button>
                </Link>
              ) : (
                <Link href="/login">
                  <button type="button" className="btn">Log in</button>
                </Link>
              )}
            </div>
          </div>
          <SearchContext.Consumer>
            {(context) => (
              <Search updateList={context.updateList} updateCoords={context.updateCoords} google={context.google}/>
            )}
          </SearchContext.Consumer>
        </div>
      </header>
    </>
  );
}
