package com.adc.product.viewmodel;

import java.util.List;

public record ProductGetCheckoutListVm(
        List<ProductCheckoutListVm> productCheckoutListVms,
        int pageNo,
        int pageSize,
        int totalElements,
        int totalPages,
        boolean isLast
) {
}
