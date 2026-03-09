package com.adc.product.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "adc.services")
public record ServiceUrlConfig(String order,String media) {
}
