package com.example.customer.viewmodel.customer;

import org.keycloak.representations.idm.UserRepresentation;

public record CustomerVm(String id, String username, String email, String firstName, String lastName) {
    public static CustomerVm fromUserRepresentation(UserRepresentation userRepresentation) {
        return new CustomerVm(userRepresentation.getId(), userRepresentation.getUsername(),
                userRepresentation.getEmail(), userRepresentation.getFirstName(), userRepresentation.getLastName());
    }

    public static CustomerVm createAnonymous() {
        return new CustomerVm(null, null, null, null, null);
    }
}
