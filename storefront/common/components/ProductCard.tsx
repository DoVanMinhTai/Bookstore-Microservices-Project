import { ProductThumbnail } from '@/modules/homepage/models/ProductThumbnail'
import React, { useState } from 'react'
import ProductCardBase from './ProductCardBase';

export interface Props {
    product: ProductThumbnail;
    thumbnailId?: number;
}

export default function ProductCard({ product, thumbnailId }: Props) {
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(thumbnailId ? '' : product.thumbnailUrl)

    return (
        <ProductCardBase product={product} thumbnailUrl={thumbnailUrl} />
    )
}