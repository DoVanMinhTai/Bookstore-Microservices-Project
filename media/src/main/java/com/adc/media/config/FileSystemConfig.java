package com.adc.media.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class FileSystemConfig {

    @Value("${file.directory}")
    private String directory;
}
