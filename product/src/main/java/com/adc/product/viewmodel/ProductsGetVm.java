package com.adc.product.viewmodel;

import java.util.List;

public record ProductsGetVm(
        List<ProductThumbnailGetVm> productContent,
        int pageNo,
        int pageSize,
        int totalElement,
        int totalPages,
        boolean isLast
) {
}
