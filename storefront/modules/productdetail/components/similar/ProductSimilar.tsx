    import { ProductThumbnail } from "@/modules/homepage/models/ProductThumbnail"
    import { useEffect, useState } from "react"
    import { ProductDetail } from "../../model/ProductDetail";
    import { getProductSimilar } from "../../services/ProductService";
    import ImageWithFallBack from "@/common/components/ImageWithFallBack";

    type Props = {
        product: ProductDetail
    }

    export default function ProductSimilar({ product }: Props) {
        const [productSimilar, setProductSimilar] = useState<ProductThumbnail[]>();

        useEffect(() => {
            getProductSimilar(product.slug)
                .then((res) => setProductSimilar(res))
                .catch((error) => console.error(error));
        }, [product.slug])
        return (
            <>
                <div className="  gap-10 border-2">
                    <div className="flex-grow border-b-2 flex items-center text-center">
                        <div className="cursor-pointer flex-grow text-center p-2 border-4 border-blue-500 font-bold bg-blue-500">
                            Sản phẩm tương tự
                        </div>

                    </div>
                    {productSimilar && productSimilar.map((item,index) => (
                        
                            <div className="flex item-center px-3 w-full gap-3 mt-3 " key={index}>
                                <ImageWithFallBack className="h-20 w-20 rounded-md" src={item.thumbnailUrl} alt={item.name} />
                                <div className="flex-grow items-center">{item.name}</div>
                                <div className="flex-grow items-center">{item.price}</div>
                            </div>

                    ))}
                </div>
            </>
        )
    }