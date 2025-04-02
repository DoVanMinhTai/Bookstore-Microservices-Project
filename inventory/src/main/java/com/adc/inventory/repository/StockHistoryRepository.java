package com.adc.inventory.repository;

import com.adc.inventory.model.Stock;
import com.adc.inventory.model.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockHistoryRepository  extends JpaRepository<StockHistory, Long> {
    void createStockHistories(List<Stock> stocks);

    List<StockHistory> findAllByProductIdAndWareHouseId(Long productId, Long warehouseId);
}
