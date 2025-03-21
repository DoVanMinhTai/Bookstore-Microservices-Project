package com.adc.order.model;

import com.adc.commonlibrary.model.AbstractAuditEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "checkout_item")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class CheckoutItem extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String productName;

    @SuppressWarnings("unsed")
    private String description;
    
    private int quantity;

    private BigDecimal productPrice;

    private BigDecimal discountAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkout_id",nullable = false)
    @JsonBackReference
    private Checkout checkout;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof CheckoutItem that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}

