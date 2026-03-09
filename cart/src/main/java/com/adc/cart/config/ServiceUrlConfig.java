package com.adc.cart.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "adc.services")
public record ServiceUrlConfig(String product,String media) {
}
