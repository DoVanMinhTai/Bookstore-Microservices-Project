package com.adc.product.viewmodel;

import java.util.Date;
import java.util.List;

public record ProductDetailGetVm(
        Long id,
        String name,
        String brandName,
        List<String> productCategories,
        String shorTDescription,
        String description,
        String specification,
        boolean isPublished,
        boolean isFeatured,
        boolean isAllowedToOrder,
        Double price,
        String thumbnailMediaUrl,
        List<String> productImageMediaUrl,
        Double availability,
        Float discountPercentage,
        Double itemWeight,
        Long numPages,
        Date publishDate,
        Long ratingsCount,
        Long stockQuantity,
        String isbn13,
        String metaDescription,
        String metaKeyword,
        String metaTitle,
        String slug,
        String packageDimensions
) {
}
