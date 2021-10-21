import Link from 'next/link';
import Search from './Search';
import Head from 'next/head';
import { SearchContext } from './SearchContext';

export default function Header() {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        {/* <script src="https://kit.fontawesome.com/02899377c4.js" crossorigin="anonymous"></script> */}
        <script defer src="https://pro.fontawesome.com/releases/v5.10.0/js/all.js" integrity="sha384-G/ZR3ntz68JZrH4pfPJyRbjW+c0+ojii5f+GYiYwldYU69A+Ejat6yIfLSxljXxD" crossOrigin="anonymous"></script>

      </Head>

      <header>
        <div className="navbar navbar-dark shadow-sm">
          <div id="nav">
            <Link href="/"><a><div className="logo"></div></a></Link>
            <div className="loginBtn">
              <button type="button" className="btn">Login</button>
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
