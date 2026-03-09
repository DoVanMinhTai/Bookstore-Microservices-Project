package com.adc.order.viewmodel.checkout;

import java.math.BigDecimal;

public record CheckoutItemVm(
        Long id,
        Long productId,
        String productName,
        String description,
        int quantity,
        BigDecimal productPrice,
        BigDecimal discountAmount,
        String checkoutId
) {
}
