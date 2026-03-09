import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { deleteCartItemByProductId } from '@/modules/cart/services/CartServices';
import { getProductById } from '@/modules/catalog/services/ProductServices';
import { ProductThumbnail } from '@/modules/homepage/models/ProductThumbnail';
import { AddressDetailVm } from '@/modules/address/model/AddressDetail';
import { createOrder } from '@/modules/orders/services/OrdersService';
import { OrdersPostVm } from '@/modules/orders/model/OrdersPostVm';
import { Checkout } from '@/modules/checkout/model/Checkout'
import { getCheckoutById } from '@/modules/checkout/service/CheckoutService';
import CheckoutShippingInfo from '@/modules/checkout/components/CheckoutShippingInfo';
import CheckoutPaymentMethod from '@/modules/checkout/components/CheckoutPaymentMethod';
import CheckoutComponents from '@/modules/checkout/components/CheckoutProductList';
import { PaymentMethod } from '@/modules/orders/model/enum/PaymentMethod';
import { DeliveryMethod } from '@/modules/orders/model/enum/DeliveryMethod';
import { PaymentStatus } from '@/modules/orders/model/enum/PaymentStatus';

interface CheckoutFormData {
    paymentMethod?: PaymentMethod;
    deliveryMethod?: DeliveryMethod;
}

const CheckoutPage = () => {
    const router = useRouter();
    const { id } = router.query
    const [checkout, setCheckout] = useState<Checkout>();
    const [product, setProduct] = useState<ProductThumbnail[]>([])
    const [shippping, setShippingAddress] = useState<AddressDetailVm>();
    const [billing, setBillingAddress] = useState<AddressDetailVm>();
    const [modalPaymentMethod, setModalPaymentMethod] = useState<boolean>(false);
    const { register, setValue } = useForm<CheckoutFormData>();
    const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>();

    useEffect(() => {
        if (id) {
            const fetchCheckout = async () => {
                getCheckoutById(id as string)
                    .then((res) => {
                        setCheckout(res)
                    }
                    )
                    .catch((err) => {
                        if (err == 404) {
                            router.push({ pathname: `/404` });
                        } else {
                            router.push({ pathname: `/login` });
                        }
                    })
            }
            fetchCheckout();
        };
    }, [id, router]);

      const productDetail = async () => {
        if (checkout) {
            const checkoutitemProduct = checkout.checkOutItemPostVms ? Array.from(checkout.checkOutItemPostVms) : [];
            const productIds = checkoutitemProduct.map((item) => item.productId);

            productIds.forEach(() => {
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
        if (checkout) {
            productDetail();
        }
    }, [checkout, productDetail()]);

    const handleUpdateCheckoutForm = (data: CheckoutFormData) => {
        setCheckoutFormData((prev) => ({
            ...prev,
            ...data
        }));
    };


    const handleAddress = (billing: AddressDetailVm, shipping: AddressDetailVm) => {
        setShippingAddress(shipping);
        setBillingAddress(billing)
    }
    const showModalPaymentMethod = () => {
        setModalPaymentMethod(!modalPaymentMethod);
    }

    const handleSubmitPostOrder = async () => {
        const ordersPostVm: OrdersPostVm = {
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
            orderItemPostVmList: checkout?.checkOutItemPostVms.map(item => {
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
        if (reponse.data.orderItemVms) {
            Array.from(reponse.data.orderItemVms).map((item) => item.productId)
                .forEach(deleteCartItemByProductId)
        }
        if (reponse.status === 200) {
            const orderId = reponse.data.id;
            router.push(`/order-success/${orderId}`)
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-10      container mx-auto">
                <CheckoutShippingInfo checkout={checkout ?? { email: '', checkOutItemPostVms: [] }} handleAddress={handleAddress} />
                <CheckoutComponents products={product} checkoutItems={checkout?.checkOutItemPostVms ?? []} />

                <div className=" col-span-2 flex justify-end p-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg"
                        onClick={showModalPaymentMethod}> Thanh toán</button>
                </div>

                <CheckoutPaymentMethod
                    display={modalPaymentMethod}
                    handleSubmit={handleSubmitPostOrder}
                    model={checkoutFormData}
                    register={register}
                    setValue={setValue}
                    onUpdate={handleUpdateCheckoutForm}
                />
                <div>{checkoutFormData?.deliveryMethod}</div>
                <div>{checkoutFormData?.paymentMethod}</div>
            </div>
        </>
    )
}

export default CheckoutPage;