import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/common/components/Layout";
import { AppProvider } from "@/context/AppProvider";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  </>
}
