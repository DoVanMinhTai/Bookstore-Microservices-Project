package com.adc.location.viewmodel.disctrict;

import lombok.Builder;

@Builder
public record DistrictVm(
        Long id,String name,String type,String location,Long stateProvinceId
) {
}
