package com.adc.location.service;

import com.adc.location.mapper.StateOrProvinceMapper;
import com.adc.location.repository.CountryRepository;
import com.adc.location.repository.StateOrProvinceRepository;
import com.adc.location.viewmodel.stateorprovince.StateOrProvinceVm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StateOrProvinceService {
    private final StateOrProvinceRepository stateOrProvinceRepository;
    private final CountryRepository countryRepository;
    private final StateOrProvinceMapper stateOrProvinceMapper;

    public List<StateOrProvinceVm> getAllByCountryId(Long countryId) {
        return stateOrProvinceRepository.findAllByCountryIdOrderByNameAsc(countryId).stream()
                .map(stateOrProvinceMapper::toStateOrProvinceViewModelFromStateOrProvince).toList();
    }

    public List<StateOrProvinceVm> getAllStateOrProvince() {
        return stateOrProvinceRepository.findAll().stream().map(stateOrProvinceMapper::toStateOrProvinceViewModelFromStateOrProvince).toList();
    }

    public StateOrProvinceVm findById(Long id) {
        return stateOrProvinceRepository.findById(id).stream().map(stateOrProvinceMapper::toStateOrProvinceViewModelFromStateOrProvince).toList().get(0);
    }
}
