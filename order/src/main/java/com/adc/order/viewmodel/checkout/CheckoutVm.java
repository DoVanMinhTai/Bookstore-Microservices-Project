package com.adc.order.viewmodel.checkout;

import com.adc.order.model.CheckoutItem;
import com.adc.order.model.enumeration.CheckoutState;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.Set;

@Builder(toBuilder = true)
public record CheckoutVm(
        String id,
        String email,
        String note,
        String promotionCode,
        CheckoutState checkoutState,
        BigDecimal totalAmount,
        BigDecimal totalShipmentFee,
        BigDecimal totalDiscountAmount,
        String shipmentMethodId,
        String paymentMethodId,
        Long shippingAddressId,
        Set<CheckoutItemVm> checkoutItemVms
) {
}
