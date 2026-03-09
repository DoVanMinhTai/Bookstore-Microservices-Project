package com.adc.cart.mapper;

import com.adc.cart.model.CartItem;
import com.adc.cart.viewmodel.CartItemGetVm;
import com.adc.cart.viewmodel.CartItemPost;
import com.adc.cart.viewmodel.CartItemPutVm;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartItemMapper {
    public CartItem toCartItem(CartItemPost cartItemPostVm, String currentUser) {
        return CartItem.builder()
                .customerId(currentUser)
                .productId(cartItemPostVm.productId())
                .quantity(cartItemPostVm.quantity()).build();
    }

    public CartItemGetVm toGetVm(CartItem cartItem) {
        return CartItemGetVm
                .builder()
                .customerId(cartItem.getCustomerId())
                .productId(cartItem.getProductId())
                .quantity(cartItem.getQuantity())
                .build();
    }

    public List<CartItemGetVm> toGetVms(List<CartItem> cartItems) {
        return cartItems.stream().map(this::toGetVm).toList();
    }

    public CartItem toCartItem(String currentUser, Long productId, int quantity) {
        return CartItem.builder().customerId(currentUser).productId(productId).quantity(quantity).build();
    }
}
