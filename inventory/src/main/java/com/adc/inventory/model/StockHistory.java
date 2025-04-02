    package com.adc.inventory.model;

    import jakarta.persistence.*;
    import lombok.*;

    @Entity
    @Table(name = "stock_history")
    @Getter
    @Setter
    @ToString
    @AllArgsConstructor(access = AccessLevel.PACKAGE)
    @NoArgsConstructor
    @Builder
    public class StockHistory {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private Long productId;

        private Long adjustedQuantity;

        private String note;

        @ManyToOne
        @JoinColumn(name = "warehouse_id", nullable = false)
        private WareHouse  wareHouse;
    }
