import React from 'react';
import { useGetProductBestSelling } from '../services/ProductService';
import ProductCard from '@/common/components/ProductCard';
import AsyncBoundary from '@/common/components/AsyncBoundary';
import { ProductThumbnail } from '../models/ProductThumbnail';
const BestSellerList = () => {
    const { data, isLoading, error } = useGetProductBestSelling();

    return (
        <>
            <div className="container mx-auto w-full px-2 my-4">
                <div className="mb-5 text-center text-xl text-slate-800">
                    Sản phẩm bán chạy
                </div>
                <div className="flex min-h-[150px] items-center justify-center">
                    <AsyncBoundary isLoading={isLoading} error={error} className="w-full">
                        {!isLoading && data && data.productList.length > 0 ? (
                            <div className="flex flex-wrap justify-center">
                                {data.productList.map((product: ProductThumbnail) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        thumbnailId={product.id}
                                    />
                                ))}
                            </div>
                        ) : null}
                        {!isLoading && (!data || data.productList.length === 0) && (
                            <p className="text-center">Hiện tại chưa có sản phẩm</p>
                        )}
                    </AsyncBoundary>
                </div>
            </div>
        </>
    );
};

export default BestSellerList;
