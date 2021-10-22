import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState('container');

  return (
    <>
      <Meta />
      <div className={theme}>
        <Header toggleTheme={setTheme} />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
