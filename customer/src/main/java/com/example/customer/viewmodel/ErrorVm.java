package com.example.customer.viewmodel;

import java.util.ArrayList;
import java.util.List;

public record ErrorVm(String statusCode, String title, String detail, List<String> fieldErrors) {
     public ErrorVm(String status, String title, String detail) {
         this(status,title,detail,new ArrayList<>());
     }

}
