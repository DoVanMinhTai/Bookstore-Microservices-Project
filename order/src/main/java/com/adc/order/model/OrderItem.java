package com.adc.order.model;

import com.adc.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Table
@Entity(name = "order_item")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "name")
    private String productName;

    private int quantity;

    @Column(name = "price")
    private BigDecimal productPrice;

    @Column(name = "description")
    private String note;

    private BigDecimal discountAmount;

    private BigDecimal taxAmount;

    private BigDecimal taxPercent;

    @SuppressWarnings("unused")
    private BigDecimal shipmentFee;

    @SuppressWarnings("unused")
    private String status;

//    @SuppressWarnings("unused")
//    private BigDecimal shipmentTax;
//
//    @SuppressWarnings("unused")
//    @JdbcTypeCode(SqlTypes.JSON)
//    @Column(name = "processing_state", columnDefinition = "jsonb")
//    private String processingState;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id",insertable = false, updatable = false)
    private Order order;
}
