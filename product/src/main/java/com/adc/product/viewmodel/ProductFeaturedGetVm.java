package com.adc.product.viewmodel;

import org.springframework.data.domain.Pageable;

import java.util.List;

public record ProductFeaturedGetVm(
        List<ProductThumbnailGetVm> productThumbnailGetVms
        , int totalPages
        ) {
}
