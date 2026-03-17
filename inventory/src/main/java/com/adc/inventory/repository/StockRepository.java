package com.adc.inventory.repository;

import com.adc.inventory.model.Stock;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    boolean existsByWareHouseIdAndProductId(Long wareHouseId, Long productId);

    List<Stock> findAllByWareHouseIdAndProductIdIn(Long warehouseId, List<Long> list);

    List<Long> getByWareHouseId(Long warehouseId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Stock s WHERE s.productId = :productId AND s.wareHouse.id = :warehouseId")
    Optional<Stock> findByProductIdAndWarehouseIdWithLock(Long productId, Long warehouseId);
}
