package com.adc.order.viewmodel.stock;

public record StockReservationVm(
        Long productId, int quantity, Long warehouseId
) {
}
