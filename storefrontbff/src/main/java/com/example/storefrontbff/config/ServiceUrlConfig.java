package com.example.storefrontbff.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@ConfigurationProperties(prefix = "services")
public record ServiceUrlConfig(
        Map<String, String> services
) {
}
