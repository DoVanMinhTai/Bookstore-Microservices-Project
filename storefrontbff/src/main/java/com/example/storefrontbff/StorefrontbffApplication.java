package com.example.storefrontbff;

import com.example.storefrontbff.config.ServiceUrlConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ServiceUrlConfig.class)
public class StorefrontbffApplication {

	public static void main(String[] args) {
		SpringApplication.run(StorefrontbffApplication.class, args);
	}

}
