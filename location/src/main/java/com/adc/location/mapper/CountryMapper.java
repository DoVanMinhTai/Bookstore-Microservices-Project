package com.adc.location.mapper;

import com.adc.location.model.Country;
import com.adc.location.viewmodel.country.CountryVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import java.util.List;
@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CountryMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "code2", source = "code2")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "code3", source = "code3")
    @Mapping(target = "isBillingEnabled", source = "isBillingEnabled")
    @Mapping(target = "isShippingEnabled", source = "isShippingEnabled")
    @Mapping(target = "isCityEnabled", source = "isCityEnabled")
    @Mapping(target = "isZipCodeEnabled", source = "isZipCodeEnabled")
    @Mapping(target = "isDistrictEnabled", source = "isDistrictEnabled")
    CountryVm toCountryViewModelFromCountry(Country country);


    @Mapping(target = "id", source = "id")
    @Mapping(target = "code2", source = "code2")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "code3", source = "code3")
    @Mapping(target = "isBillingEnabled", source = "isBillingEnabled")
    @Mapping(target = "isShippingEnabled", source = "isShippingEnabled")
    @Mapping(target = "isCityEnabled", source = "isCityEnabled")
    @Mapping(target = "isZipCodeEnabled", source = "isZipCodeEnabled")
    @Mapping(target = "isDistrictEnabled", source = "isDistrictEnabled")
    Country toCountryFromCountryViewModel(CountryVm countryVm);


    List<CountryVm> toCountryViewModel(List<Country> countries);
}
