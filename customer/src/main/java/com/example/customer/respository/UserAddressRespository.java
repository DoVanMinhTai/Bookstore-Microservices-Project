package com.example.customer.respository;

import com.example.customer.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAddressRespository extends JpaRepository<UserAddress, Long> {
    List<UserAddress> findAllByUserId(String userID);

    UserAddress findOneByUserIdAndAddressId(String userID, Long addressID);

    Optional<UserAddress> findByUserIdAndIsActiveTrue(String userID);

    List<UserAddress> findAllByAddressId(Long addressId);
}
