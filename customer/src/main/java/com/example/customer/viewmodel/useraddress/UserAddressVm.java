package com.example.customer.viewmodel.useraddress;

import com.example.customer.model.UserAddress;
import com.example.customer.viewmodel.address.AddressVm;
import lombok.Builder;

@Builder
public record UserAddressVm (Long id,
                             String userId,
                             AddressVm addressVm, Boolean isActive
                             ){
    public static UserAddressVm fromModel(UserAddress userAddress, AddressVm addressGetVm) {
//        return UserAddressVm.builder()
//                .id(userAddress.getId())
//                .userId(userAddress.getUserId())
//                .addressVm(addressGetVm)
//                .isActive(userAddress.getIsActive())
//                .build();
        return new UserAddressVm(
                userAddress.getId(),
                userAddress.getUserId(),
                addressGetVm,
                userAddress.getIsActive()
        );

    }

}
