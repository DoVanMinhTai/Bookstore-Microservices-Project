package com.example.customer.service;

import com.example.customer.model.UserAddress;
import com.example.customer.respository.UserAddressRespository;
import com.example.customer.viewmodel.address.AddressDetailVm;
import com.example.customer.viewmodel.address.AddressPostVm;
import com.example.customer.viewmodel.address.AddressVm;
import com.example.customer.viewmodel.useraddress.UserAddressVm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserAddressService {
    private final UserAddressRespository userAddressRespository;
    private final LocationService locationService;

    public UserAddressVm createUserAddress(AddressPostVm addressPostVm) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        List<UserAddress> userAddressList = userAddressRespository.findAllByUserId(userId);
        boolean isFirstAddress = userAddressList.isEmpty();

        AddressVm addressVm = locationService.createAddress(addressPostVm);
        UserAddress userAddress = UserAddress.builder().userId(userId).addressId(addressVm.id()).isActive(isFirstAddress).build();

        return UserAddressVm.fromModel(userAddressRespository.save(userAddress), addressVm);
    }


    public List<AddressDetailVm> getUserAddressList() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        List<UserAddress> userAddressList = userAddressRespository.findAllByUserId(userId);

        List<Long> listAddressIds = userAddressList.stream().map(UserAddress::getAddressId).collect(Collectors.toList());

        return locationService.getAddressDetailByIds(listAddressIds);
    }

    public AddressDetailVm getAddressIsActive() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        UserAddress userAddress = userAddressRespository.findByUserIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("No Active Address found for user"));
        return locationService.getAddressById(userAddress.getAddressId());
    }

    public List<AddressDetailVm> getAddressBillingIsActive() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserAddress> userAddress = userAddressRespository.findByUserIdAndIsActiveTrue(userId);
        return locationService.getAddressBillingById(userAddress.get().getAddressId());
    }
}
