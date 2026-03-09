import React from "react";
import { ProductDetail } from "../../model/ProductDetail";
import { formatPrice } from "@/utils/formatPrice";
import ProductOptions from "../options/ProductOptions";
type product = {
    product: ProductDetail;
    handleQuantityChange: (quantity: number) => void
}

export default function ProductInfo({ product, handleQuantityChange }: product) {
   
    return (
        <>
            <div className="px-10 mt-4 flex flex-grow flex-col  gap-5 h-auto     ">
                <div className=" text-center text-2xl">{product.name}</div>
                <div className=" text-2xl">Tên sản phẩm: {product.name}</div>
                <div className="brand">Thương hiệu: {product.brandName}</div>
                <div className="price">Gía tiền: {formatPrice(product.price)}</div>
                <div className="shortdescription">Giới thiệu ngắn: {product.shorTDescription}</div>
                <div>Hiện có: {product.availability}</div>
                {/* <div>{product.discountPercentage}</div> */}
                <div>Cân nặng: {product.itemWeight}</div>
                <div>Số trang: {product.numPages}</div>
                <div>Ngày xuất bản: {new Date(product.publishDate).toLocaleDateString()}</div>
                {/* <div>6{product.ratingsCount}</div>
                        <div>7{product.stockQuantity}</div>
                        <div>8{product.isFeatured}</div>
                        <div>9{product.isPublished}</div> */}
                <div>Kích thước: {product.packageDimensions}</div>
                <div className="border-b-4 border-b-slate-600"></div>
                <ProductOptions onQuantityChange={handleQuantityChange} />

            </div>
        </>
    )
}