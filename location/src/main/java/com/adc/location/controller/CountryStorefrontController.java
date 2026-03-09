package com.adc.location.controller;

import com.adc.location.service.CountryService;
import com.adc.location.viewmodel.country.CountryVm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("storefront/countries")
public class CountryStorefrontController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryVm>> listAllCountry() {
        return ResponseEntity.ok(countryService.listAllCountry());
    }
}
