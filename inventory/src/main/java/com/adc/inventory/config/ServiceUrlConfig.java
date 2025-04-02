package com.adc.inventory.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "adc-service")
public record ServiceUrlConfig(String product,String location) {
}
