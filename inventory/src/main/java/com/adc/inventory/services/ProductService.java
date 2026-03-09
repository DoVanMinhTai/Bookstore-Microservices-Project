package com.adc.inventory.services;

import com.adc.commonlibrary.utils.AuthenticationUtils;
import com.adc.inventory.config.ServiceUrlConfig;
import com.adc.inventory.model.enumeration.FilterExitsInWhSelection;
import com.adc.inventory.viewmodel.product.ProductInfo;
import com.adc.inventory.viewmodel.product.ProductQuantityPostVm;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {
    private RestClient restClient;
    private ServiceUrlConfig serviceUrlConfig;

    /*
     *   Steps:
     *           1. First need create jwt from security principal to headers after send request
     *           2. Build URIcomponents (path to goal)
     *           3. return object
     * */
    public ProductInfo getProduct(@NotNull Long id) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();
        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.product())
                .path("/storefront/product/{id}")
                .buildAndExpand(id)
                .toUri();
        return restClient.get().uri(uri).headers(httpHeaders -> httpHeaders.setBearerAuth(jwt))
                .retrieve().body(ProductInfo.class);
    }

    public void updateQuantity(List<ProductQuantityPostVm> productQuantityPostVms) {
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();

        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.product())
                .path("/storefront/updateProductQuantity")
                .buildAndExpand()
                .toUri();
         restClient.post()
                .uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(jwt))
                .body(productQuantityPostVms)
                .retrieve()
                .body(Void.class);

    }



    public List<ProductInfo> filterProducts(String productName, String productSku, List<Long> productIds, FilterExitsInWhSelection exitsInWhSelection) {
//        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTokenValue();
//
//        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.product())
//                .path("/store")
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("productName", productName);
        queryParams.add("productSku", productSku);
        queryParams.add("exitsInWhSelection", exitsInWhSelection.name());

        if(!CollectionUtils.isEmpty(productIds)) {
            queryParams.add("productIds", productIds.stream().map(Object::toString).collect(Collectors.joining(",")));
        }

        String jwt = AuthenticationUtils.extractJwt();

        final URI uri = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.product())
                .path("/storefront/products/filterProducts")
                .queryParams(queryParams)
                .build()
                .toUri();
        return restClient.get()
                .uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(jwt))
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<ProductInfo>>() {})
                .getBody();

    }
}
