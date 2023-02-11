import React, { ReactNode } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children ?: ReactNode
}

const Layout = ({ children } : LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>Uyiragam - Organic Ecommerce shop</title>
        <meta name="description" content="Uyiragam - Organic Ecommerce shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icoua.jpg" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  )
}

export default Layout