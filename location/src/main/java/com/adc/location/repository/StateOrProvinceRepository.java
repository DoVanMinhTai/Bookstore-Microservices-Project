package com.adc.location.repository;

import com.adc.location.model.StateOrProvince;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StateOrProvinceRepository extends JpaRepository<StateOrProvince, Long> {
    List<StateOrProvince> findAllByCountryIdOrderByNameAsc(Long countryId);
}
