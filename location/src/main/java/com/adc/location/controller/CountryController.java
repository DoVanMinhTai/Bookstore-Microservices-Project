package com.adc.location.controller;

import com.adc.location.service.CountryService;
import com.adc.location.viewmodel.country.CountryListGetVm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/storefront/countries")
@RequiredArgsConstructor
public class CountryController {
    private final CountryService countryService;

    @GetMapping()
    public ResponseEntity<CountryListGetVm> getPageableCountries(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false)
            final int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false)
            final int pageSize) {
        return ResponseEntity.ok(countryService.getPageableCountries(pageNo, pageSize));
    }
}
