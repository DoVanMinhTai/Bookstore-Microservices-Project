package com.adc.order.viewmodel.checkout;

import jakarta.validation.constraints.Positive;

public record CheckOutItemPostVm(
        Long productId,
        String description,
        @Positive
        int quantity
) {
}
