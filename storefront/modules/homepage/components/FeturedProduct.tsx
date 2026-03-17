import React, { useEffect, useState } from 'react'
import { useGetProductFeature } from '../services/ProductService'
import { ProductThumbnail } from '../models/ProductThumbnail';
import ProductCard from '@/common/components/ProductCard';
import AsyncBoundary from '@/common/components/AsyncBoundary';

const FeturedProduct = () => {
  const { data, isLoading, error } = useGetProductFeature();
  return (
    <div className="container mx-auto w-full px-2 my-4">
      <div className="mb-5 text-center text-xl text-slate-800">Sản phẩm tương tự</div>
      <div className="flex min-h-[150px] items-center justify-center">
        <AsyncBoundary isLoading={isLoading} error={error} className="w-full">
          {!isLoading && data && data.productThumbnailGetVms?.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {data.productThumbnailGetVms?.map((product: ProductThumbnail) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  thumbnailId={product.id}
                />
              ))}
            </div>
          ) : null}
          {!isLoading && (!data || data.productThumbnailGetVms?.length === 0) && (
            <p className="text-center">Hiện tại chưa có sản phẩm</p>
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
};

export default FeturedProduct;