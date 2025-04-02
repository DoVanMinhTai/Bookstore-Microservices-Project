package com.adc.inventory.repository;

import com.adc.inventory.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Stream;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByProductId(Long productId);

    CharSequence findByProductIdAndWareHouse_Id(Long productId, Long wareHouseId);

    boolean existsByWareHouseIdAndProductId(Long wareHouseId, Long productId);

    List<Stock> findAllByWareHouseIdAndProductIds(Long warehouseId, List<Long> list);

    List<Stock> findAllByProductId(List<Long> productId);

    List<Long> getByWareHouseId(Long warehouseId);
}
