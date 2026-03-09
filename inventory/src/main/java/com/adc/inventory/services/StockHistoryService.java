package com.adc.inventory.services;

import com.adc.inventory.model.Stock;
import com.adc.inventory.model.StockHistory;
import com.adc.inventory.repository.StockHistoryRepository;
import com.adc.inventory.viewmodel.stock.StockQuantityVm;
import com.adc.inventory.viewmodel.stockhistory.StockHistoryListVm;
import com.adc.inventory.viewmodel.stockhistory.StockHistoryVm;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StockHistoryService {
    private final StockHistoryRepository stockHistoryRepository;

    public void createStockHistories(final List<Stock> stockList, final List<StockQuantityVm> stockQuantityVmList) {
        List<StockHistory> stockHistories = new ArrayList<>();
        for (final Stock stock : stockList) {
            StockQuantityVm stockQuantityVm = stockQuantityVmList
                    .parallelStream()
                    .filter(item -> item.stockId().equals(stock.getId())).findFirst().orElse(null);
            stockHistories.add(new StockHistory().builder()
                    .productId(stock.getProductId())
                    .adjustedQuantity(stockQuantityVm.quantity())
                    .note(stockQuantityVm.note())
                    .wareHouse(stock.getWareHouse()).build());
        }

        stockHistoryRepository.saveAll(stockHistories);

    }

    public StockHistoryListVm getStockHistories(final Long productId, final Long warehouseId) {
        List<StockHistory> stockHistoryList = stockHistoryRepository.findAllByProductIdAndWareHouseId(productId, warehouseId);
        return new StockHistoryListVm(stockHistoryList.stream().map(stockHistory ->
                new StockHistoryVm(stockHistory.getProductId(), stockHistory.getAdjustedQuantity(), stockHistory.getNote()
                        , stockHistory.getWareHouse().getId())
        ).toList());

    }
}
