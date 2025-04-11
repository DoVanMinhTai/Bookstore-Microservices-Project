package com.adc.product.service;

import com.adc.product.config.ServiceUrlConfig;
import com.adc.product.viewmodel.MetaData;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class MediaService extends AbstractCircuitBreakFallbackHandler {
    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleMediaFallback")
    public MetaData getMedia(Long id) {
        if (id == null) {
            return new MetaData(null,"","","","","");
        }
        final URI url = UriComponentsBuilder.fromUriString(serviceUrlConfig.media())
                .path("media/media/{id}").buildAndExpand(id).toUri();
        System.out.println(url);
        return restClient.get().uri(url)
                .retrieve().body(MetaData.class);
    }

    private MetaData handleMediaFallback(Throwable throwable) throws Throwable {
        return handleTypedFallback(throwable);
    }


}
