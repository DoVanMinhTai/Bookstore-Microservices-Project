package com.adc.order.viewmodel.product;

import java.util.List;

public record ProductGetCheckOutListVm(
        List<ProductCheckoutListVm> productCheckoutListVms,
        int pageNo,
        int pageSize,
        int totalElements,
        int totalPages,
        boolean isLast
) {
}
