import React, { useState } from 'react'
import { ProductDetail } from '../model/ProductDetail'
import { formatPrice } from '@/utils/formatPrice'
import ImageWithFallBack from '@/common/components/ImageWithFallBack'
import { ProductImageGarelly } from '@/common/components/ProductImageGarelly'
import { ProductActions, ProductImage, ProductInfo, ProductOptions, ProductSimilar, ProductTabs } from './index'
type ProductDetailProps = {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailProps) {
    console.log(product);

    return (
        <>
            <div className=" w-full   mx-auto  bg-[#f0f0f0]">
                <div className="grid grid-cols-2 container mx-auto bg-[#f0f0f0]  gap-10 ">
                    <ProductImage thumbnail={product.thumbnailMediaUrl} listImages={product.productImageMediaUrl} productName={product.name} />
                    <div className="h-full flex flex-col border-2 ">
                        <ProductInfo product={product} />
                        <div className=" flex-col flex-grow flex-1 ">
                            <ProductActions />
                        </div>
                    </div>


                </div>

            </div>
            <div className="product-infor grid grid-cols-[70%_25%] container mx-auto mt-5 gap-5">
                <ProductTabs />
                <ProductSimilar />
            </div>

        </>
    )
}