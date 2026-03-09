package com.adc.product.viewmodel;

import java.util.List;

public record BookListGetVM(
    List<BookListVM> bookContent,
    int pageNo,
    int pageSize,
    int totalElements,
    int totalPages,
    boolean isLast
) {
}
