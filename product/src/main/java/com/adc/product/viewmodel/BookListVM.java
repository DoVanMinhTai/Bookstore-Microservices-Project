package com.adc.product.viewmodel;

import com.adc.product.model.Book;

public record BookListVM(
        Long id,
        String name,
        String slug
) {
    public static BookListVM fromModel(Book book) {
        return new BookListVM(
                book.getId(), book.getName(), book.getSlug());
    }
}
