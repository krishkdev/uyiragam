import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children ?: ReactNode
}

const Layout = ({ children } : LayoutProps) => {
  const router = useRouter();
  const showNav = router.pathname === "/checkout" ? false : true;
  return (
    <div className="layout">
      <Head>
        <title>Uyiragam - Organic Ecommerce shop</title>
        <meta name="description" content="Uyiragam - Organic Ecommerce shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icoua.jpg" />
      </Head>
      <header>
        {showNav && <Navbar />}
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout