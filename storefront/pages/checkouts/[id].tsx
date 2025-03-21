// import { Checkout } from '@/modules/checkout/model/Checkout'
// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
// import { getCheckoutById } from '@/modules/checkout/service/CheckoutService';
// import { CheckoutComponents } from '@/modules/checkout/components/Checkout';
// import React from 'react'
// import Head from 'next/head';

// type Props = {
//     checkout: Checkout;
// }

// export const getServerSideProps : GetServerSideProps = async (
//     context : GetServerSidePropsContext
// ) => {
//     const {id} = context.query;
//     const idNumber = Number(id);
//     const checkout = await getCheckoutById(idNumber);
//     return {
//         props: {
//             checkout
//         }
//     }
// }

// export const CheckoutPage = ({checkout} : Props) => {
//     return (
//         <>
//             <Head>checkout</Head>

//             <CheckoutComponents checkout ={checkout} />
//         </>
//     )
// }