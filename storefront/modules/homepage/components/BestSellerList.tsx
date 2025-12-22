import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCardBase from '@/common/components/ProductCardBase';
import { ProductThumbnail } from '../models/ProductThumbnail';
import { getProductBestSelling } from '../services/ProductService';
import ProductCard from '@/common/components/ProductCard';
const BestSellerList = () => {
    const [products, setProducts] = useState<ProductThumbnail[]>([]);

    useEffect(() => {
        getProductBestSelling()
            .then((res) => {
                const newProducts = Array.isArray(res) ? res : res?.productList ?? [];
                setProducts(newProducts);
            })
            .catch((error) => {
                setProducts([]);
            });
    }, []);

    return (
        <>
            <div className="container mx-auto w-full px-2 my-4">
                <div className="text-center text-xl text-slate-800 mb-5">Sản phẩm bán chạy</div>
                <div className="flex flex-wrap">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Hiện tại chưa có sản phẩm </p>
                    )}

                </div>

            </div>
        </>
    );
};

export default BestSellerList;
