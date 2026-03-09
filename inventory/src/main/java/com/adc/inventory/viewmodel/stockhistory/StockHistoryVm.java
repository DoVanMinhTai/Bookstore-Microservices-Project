package com.adc.inventory.viewmodel.stockhistory;

public record StockHistoryVm(
        Long productId,Long adjustedQuantity,String note,Long wareHouseId
) {
}
