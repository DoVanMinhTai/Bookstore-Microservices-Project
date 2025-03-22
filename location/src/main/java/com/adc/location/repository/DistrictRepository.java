package com.adc.location.repository;

import com.adc.location.model.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findAllByStateOrProvinceId(Long stateOrProvinceId);
}
