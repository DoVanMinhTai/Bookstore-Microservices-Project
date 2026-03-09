package com.adc.inventory.viewmodel.location;

public record AddressVm(
        Long id,
        String contactName,
        String phone,
        String addressLine1,
        String addressLine2,
        String city,
        String zipCode,
        Long districtId,
        Long stateOrProvinceId,
        Long countryId
) {
}
