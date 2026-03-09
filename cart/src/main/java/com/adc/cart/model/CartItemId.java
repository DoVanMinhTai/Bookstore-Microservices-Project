package com.adc.cart.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class CartItemId {
    private String customerId;
    private Long productId;
}
