import { ProductDetail } from "../../model/ProductDetail"

type Props = {
    product: ProductDetail;
    handleAddToCart: () => void;
    handleSubmitBuyNow: () => void;
}

export default function ProductActions({handleAddToCart,handleSubmitBuyNow, product} : Props) {
    return (
        <div className="px-10 flex flex-1 gap-5 w-full ">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                onClick={handleAddToCart}
            >
                Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
                onClick={handleSubmitBuyNow}
            >
                Mua Ngay
            </button>
            <button className="flex-1 bg-gray-300 py-3 rounded-md hover:bg-gray-400 transition">
                Lưu sản phẩm
            </button>
        </div>
    )
}
