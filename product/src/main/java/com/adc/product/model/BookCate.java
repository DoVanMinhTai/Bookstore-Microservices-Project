package com.adc.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "book_cate")
@Getter
@Setter
public class BookCate {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name = "book_id",nullable = false)
    @JsonIgnore
    private Book book;

    @ManyToOne()
    @JoinColumn(name = "cate_id",nullable = false)
    private Cate cate;

    public BookCate(long id, Book book, Cate cate) {
        this.id = id;
        this.book = book;
        this.cate = cate;
    }

    public BookCate() {

    }



    public Cate getGenre() {
        return cate;
    }

    public void setGenre(Cate cate) {
        this.cate = cate;
    }
}
