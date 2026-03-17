package com.adc.order.viewmodel.stock;

public record StockDeleteVm(
        Long productId, int quantity, Long warehouseId
) {
}
