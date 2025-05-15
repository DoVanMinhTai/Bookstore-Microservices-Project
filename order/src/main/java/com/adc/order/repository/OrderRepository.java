package com.adc.order.repository;


import com.adc.order.model.Order;
import com.adc.order.model.enumeration.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllByCustomerId(String customerId);

    List<Order> findAllByCreatedBy(String createdBy);


    List<Order> findAllByOrderStatus(OrderStatus orderStatus);
}
