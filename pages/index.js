<<<<<<< HEAD
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
=======
import Header from '../components/Header';
import Footer from '../components/Footer';
>>>>>>> main

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
