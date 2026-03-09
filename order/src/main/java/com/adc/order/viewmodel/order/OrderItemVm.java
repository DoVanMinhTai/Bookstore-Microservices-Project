package com.adc.order.viewmodel.order;

import com.adc.order.model.OrderItem;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record OrderItemVm(
       Long id,
       Long productId,
       Long orderId,
       String productName,
       int quantity,
       BigDecimal productPrice,
       String note,
       BigDecimal discountAmount,
       BigDecimal taxAmount,
       BigDecimal taxPercent
) {
    public static OrderItemVm fromModel(OrderItem orderItem) {
        return OrderItemVm.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProductId())
                .orderId(orderItem.getOrderId())
                .productName(orderItem.getProductName())
                .quantity(orderItem.getQuantity())
                .productPrice(orderItem.getProductPrice())
                .note(orderItem.getNote())
                .discountAmount(orderItem.getDiscountAmount())
                .taxAmount(orderItem.getTaxAmount())
                .taxPercent(orderItem.getTaxPercent()).build();
    }
}
