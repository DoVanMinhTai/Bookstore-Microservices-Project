package com.adc.order.mapper;

import com.adc.order.model.Checkout;
import com.adc.order.model.CheckoutItem;
import com.adc.order.viewmodel.checkout.CheckOutItemPostVm;
import com.adc.order.viewmodel.checkout.CheckoutItemVm;
import com.adc.order.viewmodel.checkout.CheckoutPostVm;
import com.adc.order.viewmodel.checkout.CheckoutVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface CheckoutMapper {
    
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "checkout",ignore = true)
    CheckoutItem toModel (CheckOutItemPostVm checkoutItemPostVm);
    
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "checkoutState",ignore = true)
    Checkout toModel(CheckoutPostVm checkoutPostVm);
    
    @Mapping(target = "checkoutItemVms", ignore = true)
    CheckoutVm toVm(Checkout checkout);

    @Mapping(target = "checkoutId" , source = "checkout.id")
    CheckoutItemVm toVm(CheckoutItem checkoutItem);
}
