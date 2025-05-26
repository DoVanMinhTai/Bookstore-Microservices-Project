import Header from '@/common/components/common/Header'
import Head from 'next/head'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function DashboardLayout({ children }: Props) {
    return (
        <>
            <Head>
                <title></title>
                <meta name="" />
                <link rel='icon' href='/favicon.io' />
            </Head>
            <Header />
            <div>{children}</div>
        </>
    )
}

export default DashboardLayout