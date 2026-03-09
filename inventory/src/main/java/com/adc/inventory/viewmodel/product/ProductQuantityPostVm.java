package com.adc.inventory.viewmodel.product;

import com.adc.inventory.model.Stock;

public record ProductQuantityPostVm(Long productId, Long quantity) {
    public static ProductQuantityPostVm fromModel(Stock stock) {
        return new ProductQuantityPostVm(stock.getProductId(), stock.getQuantity());
    }
}
