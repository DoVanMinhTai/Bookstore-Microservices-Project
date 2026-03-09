package com.adc.product.model;

import java.util.Collection;

public class PaginatedItems<T> {

    private final int pageIndex;
    private final int pageSize;
    private final long totalItems;
    private final Collection<T> data;

    public PaginatedItems(int pageIndex, int pageSize, long totalItems, Collection<T> data) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
        this.data = data;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public Collection<T> getData() {
        return data;
    }

    public int getPageSize() {
        return pageSize;
    }
}
