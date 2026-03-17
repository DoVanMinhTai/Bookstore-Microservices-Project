package com.adc.inventory.viewmodel.stock;

public record StockDeleteVm(
        Long productId, int quantity, Long warehouseId
) {
}
