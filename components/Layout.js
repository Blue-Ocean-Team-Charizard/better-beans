import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

const Layout = ({ children }) => {
  const [lightMode, setLightMode] = useState('container');

  return (
    <>
      <Meta />
      <div className={lightMode}>
        <Header toggleTheme={setLightMode}/>
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  )
}



export default Layout;
