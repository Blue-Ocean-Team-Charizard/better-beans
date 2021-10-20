import Header from './Header';
import Footer from './Footer';
import Meta from '../components/Meta';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="container">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
