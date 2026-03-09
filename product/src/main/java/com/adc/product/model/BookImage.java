package com.adc.product.model;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "book_image")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BookImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_id")
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "book_id",nullable = false)
    private Book book;

}
