package com.example.customer.config;

import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.keycloak.admin.client.Keycloak;

import static org.keycloak.OAuth2Constants.CLIENT_CREDENTIALS;

@Configuration
public class KeyCloakClientConfig {
    private final KeyCloakPropsConfig propsConfig;

    public KeyCloakClientConfig(KeyCloakPropsConfig propsConfig) {
        this.propsConfig = propsConfig;
    }

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
       .grantType(CLIENT_CREDENTIALS)
                .serverUrl(propsConfig.getAuthServerURL())
                .realm(propsConfig.getRealm())
                .clientId(propsConfig.getResource())
                .clientSecret(propsConfig.getCredentials().getSecret())
                .build();
    }
}
