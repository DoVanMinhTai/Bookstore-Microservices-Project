package com.example.customer.service;

import com.adc.commonlibrary.exception.NotFoundException;
import com.example.customer.config.KeyCloakPropsConfig;
import com.example.customer.viewmodel.customer.CustomerPostVm;
import com.example.customer.viewmodel.customer.CustomerVm;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CustomerService {
    private static final String ERROR =  "%s: Client %s don't have access right for this resource";
    private static final int USER_PAGE =2;
    private final Keycloak keycloak;
    private final KeyCloakPropsConfig keyCloakPropsConfig;

    public CustomerService(Keycloak keycloak, KeyCloakPropsConfig keyCloakPropsConfig) {
        this.keycloak = keycloak;
        this.keyCloakPropsConfig = keyCloakPropsConfig;
    }

    public static CredentialRepresentation credentialRepresentation(String password) {
        CredentialRepresentation passwordCredential = new CredentialRepresentation();
        passwordCredential.setTemporary(false);
        passwordCredential.setType(CredentialRepresentation.PASSWORD);
        passwordCredential.setValue(password);
        return passwordCredential;
    }
    private boolean checkUsernameExists(RealmResource realmResource,String username) {
        List<UserRepresentation> users = realmResource.users().search(username,true);
        return !users.isEmpty();
    }
    private boolean checkEmailExists(RealmResource realmResource,String email) {
        List<UserRepresentation> users = realmResource.users().search(null,null,null,email,0,1);
        return !users.isEmpty();
    }

    public CustomerVm create(CustomerPostVm customerPostVm) {
        RealmResource realmResource = keycloak.realm(keyCloakPropsConfig.getRealm());
/*
        if(checkUsernameExists(realmResource, customerPostVm.userName())) {
            throw new RuntimeException();
        }
*/
        UserRepresentation user  = new UserRepresentation();
        user.setUsername(customerPostVm.userName());
        user.setFirstName(customerPostVm.firstName());
        user.setLastName(customerPostVm.lastName());
        user.setEmail(customerPostVm.email());
        CredentialRepresentation password = credentialRepresentation(customerPostVm.password());
        user.setCredentials(Collections.singletonList(password));
        user.setEnabled(true);
        Response response = realmResource.users().create(user);

        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource userResource = realmResource.users().get(userId);

        RoleRepresentation realmRole = realmResource.roles().get(customerPostVm.role()).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(realmRole));

        return CustomerVm.fromUserRepresentation(user);
    }

    public CustomerVm getCustomerProfile(String userId) {

        if (userId == null || userId.isEmpty() || userId.equalsIgnoreCase("anonymousUser")) {
            return CustomerVm.createAnonymous();
        } else {
            try {
                return CustomerVm.fromUserRepresentation(keycloak.realm(keyCloakPropsConfig.getRealm()).users().get(userId).toRepresentation());
            } catch (NotFoundException e) {
                throw new NotFoundException(String.format(ERROR, "User not found", userId));
            }
        }
    }
}
