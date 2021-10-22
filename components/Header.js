import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Search from './Search';
import { SearchContext } from './SearchContext';
import { useAuth } from '../firebase/auth_context';

export default function Header(props) {
  const { authUser, logOff } = useAuth();
  const [checkbox, setCheckbox] = useState(false);

  const handleOnClick = (e) => {
    setCheckbox(!checkbox);
    if (checkbox) {
      props.toggleTheme('container');
    } else {
      props.toggleTheme('container lightMode')
    }
  }

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
            <Link href="/"><a><div className="logo" /></a></Link>
            <div className="mode">
              <input
                type="checkbox"
                id="toggle"
                className="toggle--checkbox"
                checked={checkbox}
                onClick={handleOnClick}
              />
              <label for="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
              </label>
              {/* <div class="darkModeIcon iconMode" onClick={() => setLightMode(!lightMode)}></div> */}
            </div>
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
