package com.adc.order.controller;

import com.adc.order.service.OrderService;
import com.adc.order.viewmodel.PaymentOrderStatusVm;
import com.adc.order.viewmodel.order.OrderPostVm;
import com.adc.order.viewmodel.order.OrderVm;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
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
    public ResponseEntity<OrderVm> getOrderById(@PathVariable Long id) throws AccessDeniedException {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/storefront/orders/listOrders")
    public ResponseEntity<List<OrderVm>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrderByUserId());
    }

    @PutMapping("/storefront/orders/status")
    public ResponseEntity<PaymentOrderStatusVm> updateOrderPaymentStatus(
            @Valid @RequestBody PaymentOrderStatusVm paymentOrderStatusVm
    ) {
        PaymentOrderStatusVm orderStatusVm = orderService.updateOrderPaymentStatus(paymentOrderStatusVm);
        return ResponseEntity.ok(orderStatusVm);
    }

    @GetMapping("/storefront/orders/byOrderState/{orderState}")
    public ResponseEntity<List<OrderVm>> getOrdersByOrderState(@PathVariable String orderState) throws AccessDeniedException {
        return ResponseEntity.ok(orderService.getOrdersByOrderState(orderState));
    }
}