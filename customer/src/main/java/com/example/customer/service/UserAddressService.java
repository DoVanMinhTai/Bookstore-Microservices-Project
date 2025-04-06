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

//    public List<UserAddress> findAllByUserId(String userID) {
//        List<UserAddress> userAddressList = new ArrayList<>();
//            for (UserAddress userAddress : userAddressRespository.findAllByUserId(userID)) {
//                userAddress.getUserId();
//                userAddressList.add(userAddress);
//            }
//            return userAddressList;
//    }

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

        List<AddressDetailVm> result = locationService.getAddressDetailByIds(listAddressIds);
        return result;
    }

    public AddressDetailVm getAddressIsActive() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<UserAddress> userAddress = userAddressRespository.findByUserIdAndIsActiveTrue(userId);

        AddressDetailVm addressDetailVm = locationService.getAddressById(userAddress.get().getAddressId());
        System.out.println(addressDetailVm);
        return addressDetailVm;
    }

    public List<AddressDetailVm> getAddressBillingIsActive() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<UserAddress> userAddress = userAddressRespository.findByUserIdAndIsActiveTrue(userId);
        List<AddressDetailVm> addressDetailVm = locationService.getAddressBillingById(userAddress.get().getAddressId());
        return addressDetailVm;
    }
}
