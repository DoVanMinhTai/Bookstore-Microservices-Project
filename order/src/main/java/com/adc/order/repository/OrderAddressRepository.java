package com.adc.order.repository;

import com.adc.order.model.CheckoutItem;
import com.adc.order.model.OrderAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderAddressRepository extends JpaRepository<OrderAddress,Long> {
}
