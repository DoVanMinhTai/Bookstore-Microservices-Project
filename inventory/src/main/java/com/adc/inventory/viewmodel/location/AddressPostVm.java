package com.adc.inventory.viewmodel.location;

import lombok.Builder;

@Builder
public record AddressPostVm(
        String contactName,
        String phone,
        String addressLine1,
        String addressLine2,
        String  city,
        String zipCode,
        Long   districtId,
        Long stateOrProvinceId,
        Long  countryId
) {
}
