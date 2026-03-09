package com.adc.location.repository;

import com.adc.location.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findAllByStateProvinceId(Long stateProvinceId);

    District findDistrictById(Long id);
}
