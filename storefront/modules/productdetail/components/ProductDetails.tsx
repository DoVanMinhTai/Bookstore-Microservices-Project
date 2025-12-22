import React, { useState } from 'react'
import { ProductDetail } from '../model/ProductDetail';
import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { ProductImageGarelly } from '@/common/components/ProductImageGarelly';
import ProductInfo from './details/ProductInfo';
import ProductActions from './actions/ProductActions';
import ProductTabs from './tabs/ProductTabs';
import ProductSimilar from './similar/ProductSimilar';
import { CartItemGetVm } from '@/modules/cart/model/CartItemGetVm';
import { addToCartItem } from '@/modules/cart/services/CartServices';
import { useCartContext } from '@/context/CartContext';
import { createCheckout } from '@/modules/checkout/service/CheckoutService';
import {useUserInfoContext } from '@/context/UserInforProvider';
import { useRouter } from 'next/router';
import { CheckoutItem } from '@/modules/checkout/model/CheckoutItem';

type ProductDetailProps = {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailProps) {
    const { fetchNumberCartItems } = useCartContext();
    const { email, firstname, lastname } = useUserInfoContext();
    const [quantity, setQuantity] = useState<number>(1);
    const [cartItem, setCartItem] = useState<CartItemGetVm | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const router = useRouter();
    const handleQuantityChange = (quantity: number) => {
        setQuantity(quantity)
    }

    const onClickHandleAddToCart = async () => {
        if (quantity < 1) {
            return;
        }
        let payload = {
            productId: product.id,
            quantity: quantity ? quantity : 0
        }

        const res = await addToCartItem(payload);
        setCartItem(res);
        fetchNumberCartItems();
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return res;

    }

    const onClickHandleSubmit = async () => {
        const checkOutItemPostVms  = {
            productId: product.id,
            description: "",
            quantity: quantity,
        }

        const newArray : CheckoutItem[]= [];
        newArray.push(checkOutItemPostVms); 
        let checkout = {
            email: email,
            note: '',
            promotionCode:"",
            shipmentMethodId: "1",
            paymentMethodId: "1",
            shippingAddressId: 1,
            checkOutItemPostVms: newArray
        }
        if (quantity > 0) {
            const res = await createCheckout(checkout);
            router.push(`/checkouts/${res?.id}`)
        }
    }

    return (
        <>
            {showNotification && (
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md animate-slide-down">
                    ✅ Thêm vào giỏ hàng thành công!
                </div>
            )}
            <div className=" w-full   mx-auto  ">
                <div className="grid grid-cols-2 container mx-auto gap-10 ">
                    {/* <ProductImage thumbnail={product.thumbnailMediaUrl} listImages={product.productImageMediaUrl} productName={product.name} /> */}
                    <div className="border-2  m-4 my-auto h-auto mx-auto">
                        {product.thumbnailMediaUrl &&
                        
                        <ImageWithFallBack src={product.thumbnailMediaUrl} className=" rounded-md" alt={product.name} />
                        }
                        <ProductImageGarelly listImage={product.productImageMediaUrl} />
                    </div>
                    <div className="h-full flex flex-col border-2 bg-[#f0f0f0]">
                        <ProductInfo product={product} handleQuantityChange={handleQuantityChange} />
                        <div className=" flex-col flex-grow flex-1 my-5 ">
                            <ProductActions product={product} handleAddToCart={onClickHandleAddToCart} handleSubmitBuyNow={onClickHandleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-infor grid grid-cols-[70%_25%] container mx-auto mt-5 gap-5">
                <ProductTabs />
                <ProductSimilar product={product} />
            </div>

        </>
    )
}