package com.adc.location.viewmodel.stateorprovince;

import com.adc.location.model.StateOrProvince;


public record StateOrProvinceVm(Long id, String code, String name, String type, Long countryId) {
    public static StateOrProvinceVm fromModel(StateOrProvince dto) {
        return new StateOrProvinceVm(dto.getId(), dto.getCode(),
                dto.getName(), dto.getType(), dto.getCountry().getId());
    }
}   
