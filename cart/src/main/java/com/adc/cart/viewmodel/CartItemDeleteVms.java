package com.adc.cart.viewmodel;

import jakarta.validation.constraints.Min;

public record CartItemDeleteVms(
        Long productId,
        @Min(1) int quantity
) {
}
