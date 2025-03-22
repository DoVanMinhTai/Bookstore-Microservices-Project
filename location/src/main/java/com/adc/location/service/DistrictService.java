package com.adc.location.service;

import com.adc.location.mapper.DistrictMapper;
import com.adc.location.repository.DistrictRepository;
import com.adc.location.viewmodel.disctrict.DistrictVm;
import com.adc.location.viewmodel.stateorprovince.StateOrProvinceVm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictService {
    private DistrictRepository districtRepository;
    private DistrictMapper districtMapper;

    public List<DistrictVm> getAllByStateOrProvinceId(Long stateOrProvinceId) {
       return  districtRepository.
               findAllByStateOrProvinceId(stateOrProvinceId).stream().map(districtMapper::ToDistrictVmFromDistrict).toList();
    }
}
