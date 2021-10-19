// import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/review.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
