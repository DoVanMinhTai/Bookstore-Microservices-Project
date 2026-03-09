package com.adc.inventory.viewmodel.warehouse;

public record WareHousePostVm(  String id,
                                String name,
                                String contactName,
                                String phone,
                                String addressLine1,
                                String addressLine2,
                                String city,
                                String zipcode,
                                Long districtId,
                                Long stateOrProvinceId,
                                Long countryId
) {
}
