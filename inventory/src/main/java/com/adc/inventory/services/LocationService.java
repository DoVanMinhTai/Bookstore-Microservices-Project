package com.adc.inventory.services;

import com.adc.inventory.config.ServiceUrlConfig;
import com.adc.inventory.viewmodel.location.LocationGetVm;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@AllArgsConstructor
public class LocationService {
    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    public LocationGetVm getAddressById(Long id) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();

        URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.location())
                .path("/storefront/address/{id}")
                .buildAndExpand(id)
                .toUri();
        return restClient.get()
                .uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(jwt))
                .retrieve()
                .body(LocationGetVm.class);
    }
}
