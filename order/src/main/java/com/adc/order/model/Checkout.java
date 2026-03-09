package com.adc.order.model;

import com.adc.commonlibrary.model.AbstractAuditEntity;
import com.adc.order.model.enumeration.CheckoutState;
import com.adc.order.model.enumeration.OrderStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Table(name = "checkout")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Checkout extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String email;

    private String note;

    @Column(name = "promotion_code")
    private String promotionCode;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private CheckoutState checkoutState;

    @SuppressWarnings("unused")
    private String customerId;

    @SuppressWarnings("unused")
    private String shipmentMethodId;

    @Column(name = "payment_method_id")
    private String paymentMethodId;

    @SuppressWarnings("unused")
    private Long shippingAddressId;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalShipmentFee = BigDecimal.ZERO;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalDiscountAmount = BigDecimal.ZERO;

    @OneToMany(mappedBy = "checkout", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Builder.Default
    private List<CheckoutItem> checkoutItems = new ArrayList<>();
}
