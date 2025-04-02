import { Checkout } from '@/modules/checkout/model/Checkout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getCheckoutById } from '@/modules/checkout/service/CheckoutService';
import CheckoutComponents from '@/modules/checkout/components/CheckoutProductList';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { AddressDetail } from '@/modules/address/model/AddressDetail';
import { useForm } from 'react-hook-form';
import { PaymentMethod } from '@/modules/orders/model/enum/PaymentMethod';
import { DeliveryMethod } from '@/modules/orders/model/enum/DeliveryMethod';
import { OrdersPostVm } from '@/modules/orders/model/OrdersPostVm';
import { PaymentStatus } from '@/modules/orders/model/enum/PaymentStatus';
import { createOrder } from '@/modules/orders/services/OrdersService';
import { deleteCartItemByProductId } from '@/modules/cart/services/CartServices';
interface CheckoutFormData {
    paymentMethod?: PaymentMethod;
    deliveryMethod?: DeliveryMethod;
}


const CheckoutPage = () => {
    // const nagivate = useNavigate();
    const router = useRouter();
    const { id } = router.query

    // const {handleSubmit: handleSubmitCheckout,
    //         register: handleRegisterCheckout,
    //         setValue: setValueRegisterCheckout,
    //         formState: { errors}
    // } = useForm<
    const [checkout, setCheckout] = useState<Checkout>();
    const [product, setProduct] = useState<ProductThumbnail[]>([])
    const [shippping, setShippingAddress] = useState<AddressDetail>();
    const [billing, setBillingAddress] = useState<AddressDetail>();
    const [modalPaymentMethod, setModalPaymentMethod] = useState<boolean>(false);
    const { register, setValue, handleSubmit } = useForm<CheckoutFormData>();
    const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>();
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


    const handleUpdateCheckoutForm = (data: CheckoutFormData) => {
        setCheckoutFormData((prev) => ({
            ...prev,
            ...data
        }));
    };


    const handleAddress = (billing: AddressDetail, shipping: AddressDetail) => {
        setShippingAddress(shipping);
        setBillingAddress(billing)
    }
    const showModalPaymentMethod = () => {
        setModalPaymentMethod(!modalPaymentMethod);
    }

    const handleSubmitPostOrder = async () => {
        // const productIdInProduct = product.map(item => item.id);
        // const productIds = checkout?.checkoutItemVms.map(item => productIdInProduct.filter())
        let ordersPostVm: OrdersPostVm = {
            checkoutId: checkout?.id,
            email: checkout?.email,
            shippingAddressPostVm: shippping,
            billingAddressPostVm: billing,
            note: checkout?.note,
            tax: 0,
            discount: 0,
            numberItem: product.length,
            totalPrice: product.reduce((total, item) => total + item.price, 0),
            deliveryFee: 0,
            couponCode: checkout?.promotionCode,
            deliveryMethod: checkoutFormData?.deliveryMethod,
            paymentMethod: checkoutFormData?.paymentMethod,
            paymentStatus: PaymentStatus.PENDING,
            orderItemPostVmList: checkout?.checkoutItemVms.map(item => {
                return {
                    productId: item.productId,
                    productName: item.productName,
                    quantity: item.quantity,
                    productPrice: item.productPrice,
                    note: "string",
                    discountAmount: item.discountAmount,
                    taxAmount: 0,
                    taxPercent: 0
                }
            }
            )

        }

        const reponse = await createOrder(ordersPostVm);
        console.log('test',reponse);
        if(reponse.data.orderItemVms) {
        Array.from(reponse.data.orderItemVms).map((item) => item.productId) 
            .forEach(deleteCartItemByProductId)}
        if (reponse.status === 200) {
            const orderId = reponse.data.id;
            router.push(`/order-success/${orderId}`)
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-10      container mx-auto">
                <CheckoutShippingInfo checkout={checkout ?? { email: '', checkoutItemVms: [] }} handleAddress={handleAddress} />
                <CheckoutComponents products={product} checkoutItems={checkout?.checkoutItemVms ?? []} />

                {/* <div>1234{shipppingAddress?.contactName}</div> */}
                <div className=" col-span-2 flex justify-end p-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg"
                        onClick={showModalPaymentMethod}
                    > Thanh toán</button>
                </div>
                <CheckoutPaymentMethod
                    display={modalPaymentMethod}
                    handleSubmit={handleSubmitPostOrder}
                    model={checkoutFormData}
                    register={register}
                    setValue={setValue}
                    onUpdate={handleUpdateCheckoutForm}
                />
                {/* <Link >Thanh Toán</Link> */}
                <div>{checkoutFormData?.deliveryMethod}</div>
                <div>{checkoutFormData?.paymentMethod}</div>
            </div>
        </>
    )
}

export default CheckoutPage;