package com.adc.product.viewmodel;

import com.adc.product.model.Book;
import com.adc.product.service.MediaService;
import lombok.Builder;

import java.time.ZonedDateTime;
import java.util.Objects;

@Builder(toBuilder = true)
public record ProductCheckoutListVm(Long id,
                                    String name,
                                    String description,
                                    String shortDescription,
                                    String sku,
                                    Long brandId,
                                    Double price,
                                    Long thumbnailUrlId) {
    public static ProductCheckoutListVm fromModel(Book product) {
        return new ProductCheckoutListVm(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getShortDescription(),
                product.getSku(),
                product.getBrand().getId(),
                product.getPrice(),
                product.getThumbnailMediaId()
        );
    }
}
