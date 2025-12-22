package com.adc.location.repository;

import com.adc.location.model.Address;
import com.adc.location.model.enumeration.AddressType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAddressByIdIn(List<Long> ids);

    List<Address> findAllByIdAndAddressType(Long id, AddressType addressType);
}
