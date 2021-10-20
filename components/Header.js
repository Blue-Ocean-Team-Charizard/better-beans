import Link from 'next/link';
import Search from './Search';
import Head from 'next/head';
import { SearchContext } from './SearchContext';

export default function Header() {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" ></script>
      </Head>

      <header>
        <div className="navbar navbar-dark shadow-sm">
          <div>
            <div className="logo"></div>
            <div className="loginBtn">
              <button type="button" className="btn btn-light">Light</button>
            </div>
          </div>
          <SearchContext.Consumer>
            {(context) => (
              <Search updateList={context.updateList} updateCoords={context.updateCoords} />
            )}
          </SearchContext.Consumer>
        </div>
      </header>
    </>
  );
}
