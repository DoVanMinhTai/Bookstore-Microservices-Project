package com.adc.order.repository;

import com.adc.order.model.CheckoutItem;
import com.adc.order.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository  extends JpaRepository<OrderItem, Long> {

    @Query("SELECT oi.productId " +
            "FROM order_item oi " +
            "JOIN oi.order o " +
            "WHERE o.paymentStatus = 'COMPLETED' AND o.orderStatus = 'COMPLETED' " +
            "GROUP BY oi.productId " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<Long> findProductIdsByCompletedOrders();

    List<OrderItem> findByOrderId(Long orderId);

    List<OrderItem> findAllByIdAndCreatedBy(Long id, String createdBy);
}
