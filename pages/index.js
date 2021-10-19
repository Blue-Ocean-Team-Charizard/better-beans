import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="container">
        Welcome to Blue Ocean
      </div>
      <Footer />
    </div>
  );
}
