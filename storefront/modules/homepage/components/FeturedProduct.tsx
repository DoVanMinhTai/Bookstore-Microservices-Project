import React, { useEffect, useState } from 'react'
import { getProductFeature } from '../services/ProductService'
import { ProductThumbnail } from '../models/ProductThumbnail';
import ProductCard from '@/common/components/ProductCard';
import { error } from 'console';

const FeturedProduct = () => {
  const [products, setProducts] = useState<ProductThumbnail[]>([]);
  useEffect(() => {
    getProductFeature().then((res) => {
      setProducts(res.productThumbnailGetVms);      
    })
    .catch((error) => {
      setProducts([]);
    });
  },[]);
  return (
      <div className="container mx-auto w-full px-2 my-10">
        <div className="text-center text-xl text-slate-800 mb-5">Sản phẩm tương tự</div>
        <div className="flex flex-wrap">
          {products.map((product) => (
            <ProductCard product={product} key={product.id}/>
          )
          )}

        </div>
      </div >
  )
}

export default FeturedProduct