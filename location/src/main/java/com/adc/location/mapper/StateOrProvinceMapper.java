package com.adc.location.mapper;

import com.adc.location.model.StateOrProvince;
import com.adc.location.viewmodel.stateorprovince.StateOrProvinceVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring"
        ,nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface StateOrProvinceMapper {

    @Mapping(target = "countryId", source = "country.id")
    StateOrProvinceVm toStateOrProvinceViewModelFromStateOrProvince(StateOrProvince stateOrProvince);

}
