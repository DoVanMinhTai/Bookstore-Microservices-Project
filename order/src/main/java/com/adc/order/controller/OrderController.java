package com.adc.order.controller;

import com.adc.order.service.OrderService;
import com.adc.order.viewmodel.order.OrderPostVm;
import com.adc.order.viewmodel.order.OrderVm;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/completed/products")
    public ResponseEntity<List<Long>> getCompletedProducts() {
        return ResponseEntity.ok(orderService.findProductIdsByCompletedOrders());
    }
    
    @PostMapping("/storefront/orders")
    public ResponseEntity<OrderVm> createOrder(@RequestBody OrderPostVm orderPostVm) {
        return ResponseEntity.ok(orderService.createOrder(orderPostVm));
    }

    @GetMapping("/storefront/orders/{id}")
    public ResponseEntity<OrderVm> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/storefront/orders/listOrders")
    public ResponseEntity<List<OrderVm>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrderByUserId());
    }
}
