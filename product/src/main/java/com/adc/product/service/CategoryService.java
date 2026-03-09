package com.adc.product.service;

import com.adc.product.respository.BookCategoryRepository;

public class CategoryService {
    private final BookCategoryRepository bookCategoryRepository;

    public CategoryService(BookCategoryRepository bookCategoryRepository) {
        this.bookCategoryRepository = bookCategoryRepository;
    }
}
