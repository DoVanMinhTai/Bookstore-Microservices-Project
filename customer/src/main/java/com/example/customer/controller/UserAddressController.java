package com.example.customer.controller;

import com.example.customer.model.UserAddress;
import com.example.customer.service.UserAddressService;
import com.example.customer.viewmodel.address.AddressDetailVm;
import com.example.customer.viewmodel.address.AddressPostVm;
import com.example.customer.viewmodel.useraddress.UserAddressVm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserAddressController {
    private final UserAddressService userAddressService;

    public UserAddressController(UserAddressService userAddressService) {
        this.userAddressService = userAddressService;
    }

    @PostMapping("/storefront/createUserAddress")
    public ResponseEntity<UserAddressVm> create(@RequestBody AddressPostVm addressPostVm) {
        return ResponseEntity.ok(userAddressService.createUserAddress(addressPostVm));
    }

    @GetMapping("/storefront/getUserAddressList")
    public ResponseEntity<List<AddressDetailVm>> getUserAddressList() {
        return ResponseEntity.ok(userAddressService.getUserAddressList());
    }

}
