import React from 'react'
import Head from 'next/head'
import Header from './common/Header'
import AuthenticationInfo from './AuthenticationInfo'
import Footer from './common/Footer'
import { useRouter } from 'next/router'
type Props =  {
    children:  React.ReactNode;
}
const Layout = ({children} : Props) => {
    const router = useRouter();
    const hiddenFooterPages = ['/carts']
    return (
        <>
        <Head>
            <title>BookShop</title>
            <meta name="description" content="Yet another shop storefront" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header>
                {/* <AuthenticationInfo /> */}
            </Header>
            <div className="body">{children}</div>
            {!hiddenFooterPages.includes(router.pathname) && <Footer />}
        </>

    )
}

export default Layout