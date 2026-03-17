package com.adc.order.service;

import com.adc.commonlibrary.utils.AuthenticationUtils;
import com.adc.order.config.ServiceUrlConfig;
import com.adc.order.viewmodel.stock.StockDeleteVm;
import com.adc.order.viewmodel.stock.StockReservationVm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {
    private final ServiceUrlConfig serviceUrlConfig;
    private final RestClient restClient;

    public ResponseEntity<Void> reduceStock(List<StockDeleteVm> stockDeleteVms) {
        final String jwt = AuthenticationUtils.extractJwt();

        final URI url = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.inventory())
                .path("/reduceStock")
                .buildAndExpand().toUri();
        return restClient.post().uri(url).headers(httpHeaders -> httpHeaders.setBearerAuth(jwt)).body(stockDeleteVms).retrieve().toEntity(Void.class);
    }

    public ResponseEntity<Void> reserveStock(List<StockReservationVm> stockReservationVms) {
        final String jwt = AuthenticationUtils.extractJwt();

        final URI url = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.inventory())
                .path("/reserve")
                .buildAndExpand().toUri();

        return restClient.post()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(jwt))
                .body(stockReservationVms)
                .retrieve()
                .toEntity(Void.class);
    }
}
