package com.adc.inventory.repository;

import com.adc.inventory.model.WareHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WareHouseRepository extends JpaRepository<WareHouse, Long> {
    boolean existsByName(String name);
}
