package com.adc.product.viewmodel;

public record ProductThumbnailGetVm(
        Long id, String name, String slug,String thumbnailUrl,Double price
) {
}
