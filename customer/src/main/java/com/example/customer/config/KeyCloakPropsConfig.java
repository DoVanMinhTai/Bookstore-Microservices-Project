package com.example.customer.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(value = "keycloak")
public class KeyCloakPropsConfig {
    private String authServerURL;
    private String realm;
    private String resource;
    private Credentials credentials = new Credentials();


    @Getter
    @Setter
    public class Credentials {
        private String secret;

    }

}
