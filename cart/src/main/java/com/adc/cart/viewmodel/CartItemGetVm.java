package com.adc.cart.viewmodel;

import com.adc.cart.model.CartItem;
import lombok.Builder;

@Builder
public record CartItemGetVm(String customerId,Long productId, Integer quantity ) {

}
    