package com.example.customer.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "adc-service")
public record ServiceUrlConfig(String location) {
}
