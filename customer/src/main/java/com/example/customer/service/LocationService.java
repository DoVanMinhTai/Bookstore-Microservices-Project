package com.example.customer.service;

import com.example.customer.config.ServiceUrlConfig;
import com.example.customer.viewmodel.address.AddressDetailVm;
import com.example.customer.viewmodel.address.AddressVm;
import com.example.customer.viewmodel.address.UserAddressPostVm;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    public AddressDetailVm getAddressById(Long id) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();

        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.location()).path("/storefront/addresses/{id}").buildAndExpand(id).toUri();
        return restClient.get().uri(uri).headers(httpHeaders -> httpHeaders.setBearerAuth(jwt)).retrieve().body(AddressDetailVm.class);
    }

    public List<AddressDetailVm> getAddressBillingById(List<Long> addressIds) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();

        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.location()).path("/storefront/addresses/billingAddresses")
                .queryParam("ids", addressIds)
                .build()
                .toUri();
        return restClient.get().uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(jwt))
                .retrieve().body(new ParameterizedTypeReference<List<AddressDetailVm>>() {
        });
    }

    public AddressVm createAddress(UserAddressPostVm addressPostVm) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();

        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.location()).path("/storefront/addresses").buildAndExpand().toUri();
        return restClient.post().uri(uri).headers(httpHeaders -> httpHeaders.setBearerAuth(jwt)).body(addressPostVm).retrieve().body(AddressVm.class);
    }

    public List<AddressDetailVm> getAddressDetailByIds(List<Long> ids) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();

        URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.location()).path("/storefront/addresses").queryParam("ids", ids).build().toUri();

        return restClient.get().uri(uri).headers(httpHeaders -> httpHeaders.setBearerAuth(jwt)).retrieve().body(new ParameterizedTypeReference<List<AddressDetailVm>>() {
        });
    }

}
