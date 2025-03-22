package com.adc.location.mapper;

import com.adc.location.model.District;
import com.adc.location.model.StateOrProvince;
import com.adc.location.viewmodel.disctrict.DistrictVm;
import com.adc.location.viewmodel.stateorprovince.StateOrProvinceVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring"
        ,nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface DistrictMapper {
    @Mapping(target = "stateOrProvinceId", source = "stateOrProvinceId.id")
    DistrictVm ToDistrictVmFromDistrict(District district);
//    StateOrProvinceVm toStateOrProvinceViewModelFromStateOrProvince(StateOrProvince stateOrProvince);

}
