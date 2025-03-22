package com.adc.location.controller;

import com.adc.location.service.DistrictService;
import com.adc.location.viewmodel.disctrict.DistrictVm;
import com.adc.location.viewmodel.stateorprovince.StateOrProvinceVm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/storefront/state-or-province")
public class DistrictController {
    private final DistrictService districtService;

    @GetMapping("/{stateOrProvinceId}")
    public ResponseEntity<List<DistrictVm>> getStateOrProvinceByCountryId(@PathVariable final Long stateOrProvinceId) {
        return ResponseEntity.ok(districtService.getAllByStateOrProvinceId(stateOrProvinceId));
    }
}
