package com.example.customer.controller;

import com.example.customer.service.CustomerService;
import com.example.customer.viewmodel.customer.CustomerVm;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/storefront/customer/profile")
    public ResponseEntity<CustomerVm> getUserProfile() {
        return ResponseEntity.ok(
                customerService.getCustomerProfile(SecurityContextHolder.getContext().getAuthentication().getName()));
    }

}
