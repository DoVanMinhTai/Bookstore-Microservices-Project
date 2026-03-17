package com.adc.order.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "services")
public record ServiceUrlConfig(
        String customer,String product,String promotion, String inventory
) {
}
