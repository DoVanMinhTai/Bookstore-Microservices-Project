import React from "react";
import { ProductDetail } from "../../model/ProductDetail";
import { formatPrice } from "@/utils/formatPrice";
import ProductOptions from "../options/ProductOptions";

type productProps = {
    product: ProductDetail;
    handleQuantityChange: (quantity: number) => void
}

export default function ProductInfo({ product, handleQuantityChange }: productProps) {
    const formattedDate = product.publishDate 
        ? new Intl.DateTimeFormat('vi-VN').format(new Date(product.publishDate))
        : "Đang cập nhật";

    return (
        <div className="flex flex-col gap-6 px-4 md:px-10 py-4">
            <div className="space-y-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    {product.brandName || "Thương hiệu mới"}
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
                    {product.name}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-rose-600">
                    {formatPrice(product.price)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    product.availability > 0 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                    {product.availability > 0 ? `Còn hàng (${product.availability})` : "Hết hàng"}
                </span>
            </div>

            {product.shorTDescription && (
                <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-4">
                    {product.shorTDescription}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-slate-100">
                <SpecItem label="Cân nặng" value={product.itemWeight} />
                <SpecItem label="Số trang" value={`${product.numPages} trang`} />
                <SpecItem label="Kích thước" value={product.packageDimensions} />
                <SpecItem label="Ngày xuất bản" value={formattedDate} />
            </div>

            <div className="pt-2">
                <ProductOptions onQuantityChange={handleQuantityChange} />
            </div>
        </div>
    );
}

function SpecItem({ label, value }: { label: string, value: string | number }) {
    if (!value) return null;
    return (
        <div className="flex justify-between sm:justify-start sm:gap-4 text-sm">
            <span className="text-slate-500 min-w-[100px]">{label}:</span>
            <span className="font-semibold text-slate-800">{value}</span>
        </div>
    );
}