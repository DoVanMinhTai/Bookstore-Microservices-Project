package com.adc.inventory.viewmodel.stock;

public record StockReservationVm(
        Long productId, int quantity, Long warehouseId
) {
}
