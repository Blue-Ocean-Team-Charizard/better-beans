import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

const Layout = ({ children }) => (
  <>
    <Meta />
    <div className="container">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  </>
);

export default Layout;
