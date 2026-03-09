package com.adc.order.viewmodel.product;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder(toBuilder = true)
@Data
public class ProductCheckoutListVm {
    Long id;
    String name;
    Double price;
    Long taxClassId;
}
