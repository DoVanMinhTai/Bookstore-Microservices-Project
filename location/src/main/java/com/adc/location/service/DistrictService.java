package com.adc.location.service;

import com.adc.location.mapper.DistrictMapper;
import com.adc.location.repository.DistrictRepository;
import com.adc.location.viewmodel.disctrict.DistrictVm;
import com.adc.location.viewmodel.stateorprovince.StateOrProvinceVm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DistrictService {
    private final DistrictRepository districtRepository;
    private final DistrictMapper districtMapper;

    public List<DistrictVm> getAllByStateOrProvinceId(Long stateOrProvinceId) {
       return  districtRepository.
               findAllByStateProvinceId(stateOrProvinceId).stream().map(districtMapper::ToDistrictVmFromDistrict).toList();
    }

    public List<DistrictVm> getAllDistrict() {
        return districtRepository.findAll().stream().map(districtMapper::ToDistrictVmFromDistrict).toList();
    }

    public DistrictVm findById(Long id) {
        return districtMapper.ToDistrictVmFromDistrict(districtRepository.findDistrictById(id));
    }
}
