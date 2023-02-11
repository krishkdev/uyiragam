import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { StateContext } from '@/context/StateContext';

import { Toaster } from 'react-hot-toast';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
