package com.adc.product.service;

import com.adc.commonlibrary.utils.AuthenticationUtils;
import com.adc.product.config.ServiceUrlConfig;
import com.adc.product.viewmodel.BookListVM;
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
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService extends  AbstractCircuitBreakFallbackHandler {
    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleProductInfomationFallback")
    public List<Long> getProductByIdAndCompleted() {
        final URI orderServiceUrl = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.order())
                .path("/order/completed/products")
                .build().toUri();
        log.info("🔹 Calling OrderService: {}", orderServiceUrl);

        return restClient.get()
                .uri(orderServiceUrl)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<Long>>() {})
                .getBody();

    }
    public List<Long> handleProductInfomationFallback(Exception ex) {
        log.error("⚠️ Fallback method triggered due to: {}", ex.getMessage());
        return List.of(); // Trả về danh sách rỗng thay vì lỗi
    }

}
