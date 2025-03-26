import { Checkout } from '@/modules/checkout/model/Checkout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getCheckoutById } from '@/modules/checkout/service/CheckoutService';
import CheckoutComponents from '@/modules/checkout/components/CheckoutProductList';
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CheckoutVm } from '@/modules/checkout/model/CheckoutVm';
import { error } from 'console';
import { getProductById } from '@/modules/catalog/services/ProductServices';
import { ProductThumbnail } from '@/modules/homepage/models/ProductThumbnail';
import { CartItem } from '@/modules/cart/components/CartItem';
import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import CheckoutPaymentMethod from '@/modules/checkout/components/CheckoutPaymentMethod';
import CheckoutShippingInfo from '@/modules/checkout/components/CheckoutShippingInfo';
import { CountryListGetVm } from '@/modules/country/model/CountryListGetVm';
type Props = {
    checkout: Checkout;
}

const CheckoutPage = () => {
    const router = useRouter();
    const { id } = router.query

    const [checkout, setCheckout] = useState<Checkout>();
    const [product, setProduct] = useState<ProductThumbnail[]>([])
    const [country, setCountry] = useState<CountryListGetVm>();

    useEffect(() => {
        if (id) {
            const fetchCheckout = async () => {
                getCheckoutById(id as string)
                    .then((res) => {
                        console.log("res of checkout", res)
                        setCheckout(res)
                    }
                    )
                    .catch((err) => {
                        if (err == 404) {
                            router.push({ pathname: `/404` }); //NOSONAR
                        } else {
                            router.push({ pathname: `/login` }); //NOSONAR
                        }
                    })
            }
            fetchCheckout();
        };
    }, [id]);


    useEffect(() => {
        if (checkout) {
            productDetail();
        }
    }, [checkout]);


    const productDetail = async () => {
        if (checkout) {
            const checkoutitemProduct = checkout.checkoutItemVms ? Array.from(checkout.checkoutItemVms) : [];
            console.log("checkoutitemproduc", checkout.checkoutItemVms);

            const productIds = checkoutitemProduct.map((item) => item.productId);
            console.log("productIds", productIds);

            productIds.forEach((id, index) => {
                console.log(`Product ID ${index + 1}:`, id);
            });

            await getProductById(productIds)
                .then((res) => {
                    setProduct(res);


                }).catch((error) => {
                    if (error.status == 404) {
                        return;

                    }
                    console.error(error)
                })

        }
    }


    useEffect(() => {
        // getListCountry()
    })



    return (
        <>
            <div className="grid grid-cols-2      container mx-auto">
                <CheckoutShippingInfo checkout={checkout ?? { email: '', checkoutItemVms: [] }} />
                <CheckoutComponents products={product} checkoutItems={checkout?.checkoutItemVms ?? []} />
                {/* <CheckoutPaymentMethod /> */}
            </div>
        </>
    )
}

export default CheckoutPage;