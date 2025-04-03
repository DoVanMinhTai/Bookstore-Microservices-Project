import React, { useState } from 'react'
import { ProductDetail } from '../model/ProductDetail';
import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { ProductImageGarelly } from '@/common/components/ProductImageGarelly';
import ProductInfo from './details/ProductInfo';
import ProductActions from './actions/ProductActions';
import ProductTabs from './tabs/ProductTabs';
import ProductSimilar from './similar/ProductSimilar';

type ProductDetailProps = {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailProps) {

    return (
        <>
            <div className=" w-full   mx-auto  ">
                <div className="grid grid-cols-2 container mx-auto gap-10 ">
                    {/* <ProductImage thumbnail={product.thumbnailMediaUrl} listImages={product.productImageMediaUrl} productName={product.name} /> */}
                    <div className="border-2  m-4 my-auto h-auto mx-auto">

                        <ImageWithFallBack src={product.thumbnailMediaUrl} className=" rounded-md" alt={product.name} />
                        <ProductImageGarelly listImage={product.productImageMediaUrl} />
                    </div>

                    <div className="h-full flex flex-col border-2 bg-[#f0f0f0]">
                        <ProductInfo product={product} />
                        <div className=" flex-col flex-grow flex-1 my-5 ">
                            <ProductActions />
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