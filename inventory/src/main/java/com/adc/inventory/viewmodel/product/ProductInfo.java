package com.adc.inventory.viewmodel.product;

public record ProductInfo(
        long id, String name, String sku, boolean exist
) {
}
