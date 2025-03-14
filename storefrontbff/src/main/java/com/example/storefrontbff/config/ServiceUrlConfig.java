package com.example.storefrontbff.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@ConfigurationProperties(prefix = "adc")
public record ServiceUrlConfig(
        Map<String, String> services
) {
}
