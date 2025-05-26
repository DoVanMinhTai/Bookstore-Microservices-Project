package com.adc.order.service;

import com.adc.commonlibrary.exception.NotFoundException;
import com.adc.commonlibrary.utils.AuthenticationUtils;
import com.adc.order.model.Order;
import com.adc.order.model.OrderAddress;
import com.adc.order.model.OrderItem;
import com.adc.order.model.enumeration.DeliveryStatus;
import com.adc.order.model.enumeration.OrderStatus;
import com.adc.order.model.enumeration.PaymentStatus;
import com.adc.order.repository.OrderItemRepository;
import com.adc.order.repository.OrderRepository;
import com.adc.order.viewmodel.PaymentOrderStatusVm;
import com.adc.order.viewmodel.order.OrderItemVm;
import com.adc.order.viewmodel.order.OrderPostVm;
import com.adc.order.viewmodel.order.OrderVm;
import com.adc.order.viewmodel.orderaddress.OrderAddressPostVm;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public List<Long> findProductIdsByCompletedOrders() {
        return orderItemRepository.findProductIdsByCompletedOrders();
    }

    public OrderVm createOrder(OrderPostVm orderPostVm) {
        OrderAddressPostVm shippingOrderAddressPostVm = orderPostVm.shippingAddressPostVm();
        OrderAddress shippingAddress = OrderAddress.builder()
                .contactName(shippingOrderAddressPostVm.contactName())
                .phone(shippingOrderAddressPostVm.phone())
                .addressLine1(shippingOrderAddressPostVm.addressLine1())
                .addressLine2(shippingOrderAddressPostVm.addressLine2())
                .city(shippingOrderAddressPostVm.city())
                .zipCode(shippingOrderAddressPostVm.zipCode())
                .districtId(shippingOrderAddressPostVm.districtId())
                .districtName(shippingOrderAddressPostVm.districtName())
                .stateOrProvinceId(shippingOrderAddressPostVm.stateOrProvinceId())
                .stateOrProvinceName(shippingOrderAddressPostVm.stateOrProvinceName())
                .countryId(shippingOrderAddressPostVm.countryId())
                .countryName(shippingOrderAddressPostVm.countryName()).build();

        OrderAddressPostVm billingAddressPostVm = orderPostVm.shippingAddressPostVm();
        OrderAddress billingAddress = OrderAddress.builder()
                .contactName(billingAddressPostVm.contactName())
                .phone(billingAddressPostVm.phone())
                .addressLine1(billingAddressPostVm.addressLine1())
                .addressLine2(billingAddressPostVm.addressLine2())
                .city(billingAddressPostVm.city())
                .zipCode(billingAddressPostVm.zipCode())
                .districtId(billingAddressPostVm.districtId())
                .districtName(billingAddressPostVm.districtName())
                .stateOrProvinceId(billingAddressPostVm.stateOrProvinceId())
                .stateOrProvinceName(billingAddressPostVm.stateOrProvinceName())
                .countryId(billingAddressPostVm.countryId())
                .countryName(billingAddressPostVm.countryName()).build();

        Order order = Order.builder()
                .email(orderPostVm.email())
                .shippingAddressId(shippingAddress)
                .billingAddressId(billingAddress)
                .note(orderPostVm.note())
                .tax(orderPostVm.tax())
                .discount(orderPostVm.discount())
                .numberItem(orderPostVm.numberItem())
                .discount(orderPostVm.discount())
                .totalPrice(orderPostVm.totalPrice())
                .orderStatus(OrderStatus.PENDING)
                .deliveryMethod(orderPostVm.deliveryMethod())
                .deliveryStatus(DeliveryStatus.PREPARING)
                .paymentStatus(orderPostVm.paymentStatus())
                .checkoutId(orderPostVm.checkoutId())
                .build();
        orderRepository.save(order);

        Set<OrderItem> orderItems = orderPostVm.orderItemPostVmList().stream()
                .map(item -> OrderItem.builder()
                        .productId(item.productId())
                        .productName(item.productName())
                        .quantity(item.quantity())
                        .productPrice(item.productPrice())
                        .note(item.note())
                        .orderId(order.getId()).build())
                .collect(Collectors.toSet());
        orderItemRepository.saveAll(orderItems);
        OrderVm orderVm = OrderVm.fromModel(order, orderItems);

//        con tru san pham trong kho
//        xoa san pham trong gio hang
//        chap nhan order

        acceptOrder(orderVm.id());
        return orderVm;

    }

    private void acceptOrder(Long orderId) {
        Order order = this.orderRepository.findById(orderId).orElseThrow(
                () -> new NotFoundException("ORDER_NOT_FOUND", orderId));
        order.setOrderStatus(OrderStatus.ACCEPTED);
        orderRepository.save(order);
    }


    public OrderVm getOrderById(Long id) throws AccessDeniedException {
        Order order = orderRepository.findById(id).orElseThrow();
        String userId = AuthenticationUtils.extractUserId();
        if (!order.getCreatedBy().equals(userId)) {
            throw new AccessDeniedException("ORDER_ACCESS_DENIED");
        }
        Set<OrderItem> orderItemSet = new HashSet<>(orderItemRepository.findByOrderId(order.getId()));
        OrderVm orderVm = OrderVm.fromModel(order, orderItemSet);
        return orderVm;

    }

    public List<OrderVm> getAllOrderByUserId() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        List<Order> orders = orderRepository.findAllByCreatedBy(userId);
        Set<OrderItem> orderItems = new HashSet<>(orderItemRepository.findByOrderId(orders.get(0).getId()));
        if (orderItems.isEmpty()) {
            return List.of();
        }

        return orders.stream().map(
                order -> {
                    Set<OrderItem> orderItemSet = new HashSet<>(orderItemRepository.findByOrderId(order.getId()));
                    OrderVm orderVm = OrderVm.fromModel(order, orderItemSet);
                    return orderVm;
                }
        ).toList();
    }

    public PaymentOrderStatusVm updateOrderPaymentStatus(@Valid PaymentOrderStatusVm paymentOrderStatusVm) {
        Order order = orderRepository.findById(paymentOrderStatusVm.orderId()).orElseThrow(() -> new NotFoundException("ORDER_NOT_FOUND", paymentOrderStatusVm.orderId()));

        order.setPaymentId(paymentOrderStatusVm.paymentId());
        order.setPaymentStatus(PaymentStatus.valueOf(paymentOrderStatusVm.paymentStatus()));
        if (PaymentStatus.COMPLETED.equals(PaymentStatus.valueOf(paymentOrderStatusVm.paymentStatus()))) {
            order.setOrderStatus(OrderStatus.PAID);
        }
        Order result = orderRepository.save(order);
        return PaymentOrderStatusVm.builder()
                .orderId(result.getId())
                .orderStatus(String.valueOf(result.getOrderStatus()))
                .paymentId(result.getPaymentId())
                .paymentStatus(String.valueOf(result.getPaymentStatus())).build();
    }

    public List<OrderVm> getOrdersByOrderState(String orderState) throws AccessDeniedException {
        OrderStatus orderStatus;
        String userId = AuthenticationUtils.extractUserId();
        if (userId == null || userId.isBlank()) {
            throw new AccessDeniedException("User not authenticated.");
        }
        try {
            orderStatus = OrderStatus.valueOf(orderState);
        } catch (IllegalArgumentException e) {
            return List.of();
        }

        List<Order> order = orderRepository.findAllByOrderStatus(orderStatus);
        List<OrderVm> orderVms = new ArrayList<>();

        if (order == null) {
            return List.of();
        }

        return order.stream().map(item -> {
            List<OrderItem> orderItems = orderItemRepository.findAllByIdAndCreatedBy(item.getId(),userId);
            return OrderVm.fromModel(item, new HashSet<>(orderItems));
        }).toList();
    }
}
