package com.adc.order.viewmodel.order;

import com.adc.order.model.enumeration.DeliveryMethod;
import com.adc.order.model.enumeration.PaymentMethod;
import com.adc.order.model.enumeration.PaymentStatus;
import com.adc.order.viewmodel.orderaddress.OrderAddressPostVm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record OrderPostVm(
        @NotBlank String checkoutId,
        @NotBlank String email,
        @NotNull OrderAddressPostVm shippingAddressPostVm,
        @NotNull OrderAddressPostVm billingAddressPostVm,
        String note,
        float tax,
        float discount,
        int numberItem,
        @NotNull BigDecimal totalPrice,
        BigDecimal deliveryFee,
        String couponCode,
        @NotNull DeliveryMethod deliveryMethod,
        @NotNull PaymentMethod paymentMethod,
        @NotNull PaymentStatus paymentStatus,
        List<OrderItemPostVm> orderItemPostVmList
        ) {
}
