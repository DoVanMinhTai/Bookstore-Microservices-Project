package com.adc.product.service;

import com.adc.product.config.ServiceUrlConfig;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService extends AbstractCircuitBreakFallbackHandler {
    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleProductInformationFallback")
    public List<Long> getProductByIdAndCompleted() {
        final URI orderServiceUrl = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.order())
                .path("/order/completed/products")
                .build().toUri();
        return restClient.get()
                .uri(orderServiceUrl)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<Long>>() {
                })
                .getBody();
    }

    public List<Long> handleProductInformationFallback(Exception ex) {
        return List.of();
    }

}
