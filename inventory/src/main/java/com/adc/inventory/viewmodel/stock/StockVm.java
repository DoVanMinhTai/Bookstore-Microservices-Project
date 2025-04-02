package com.adc.inventory.viewmodel.stock;

import com.adc.inventory.model.Stock;
import com.adc.inventory.viewmodel.product.ProductInfo;

public record StockVm(
        Long id,
        Long productId,
        String productName,
        String productSku,
        Long quantity,
        Long reversedQuantity,
        Long wareHouseId
) {
    public static StockVm fromModel(Stock stock, ProductInfo productInfo) {
        return new StockVm(stock.getId(),
                stock.getProductId(),
                productInfo.name(),
                productInfo.sku(),
                stock.getQuantity(),
                stock.getReversedQuantity(),
                stock.getReversedQuantity());
    }
}
