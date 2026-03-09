package com.adc.inventory.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock")
@Getter
@Setter
@ToString
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor
@Builder
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId;

    private Long quantity;

    private Long reversedQuantity;

    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    private WareHouse  wareHouse;
}
