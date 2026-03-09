package com.adc.order.repository;

import com.adc.order.model.CheckoutItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutItemRepository extends JpaRepository<CheckoutItem,Long> {
}
