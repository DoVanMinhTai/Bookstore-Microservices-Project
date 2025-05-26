import React from 'react'
import Head from 'next/head'
import Header from './common/Header'
import Footer from './common/Footer'
import { useRouter } from 'next/router'

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    const router = useRouter();
    const hiddenFooterPages = ['/carts', '/checkouts', '/profile', '/myorders']
    return (
        <>
            <Head>
                <title>BookShop</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="body">{children}</div>
            {!hiddenFooterPages.includes(router.pathname) && <Footer />}
        </>

    )
}

export default Layout