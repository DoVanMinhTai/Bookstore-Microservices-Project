package com.example.customer.viewmodel.customer;

import java.util.List;


public record CustomerList(int totalUser, List<CustomerAdminVm> customers , int totaPage) {
}
