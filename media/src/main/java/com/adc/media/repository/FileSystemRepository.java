package com.adc.media.repository;

import com.adc.media.config.FileSystemConfig;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Repository;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Repository
@RequiredArgsConstructor
public class FileSystemRepository {
    private final FileSystemConfig fileSystemConfig;
    private static final String DIRECTORY_DOES_NOT_EXIST = "Directory does not exist";
    @SneakyThrows
    public InputStream getFile(String filePath)  {
        Path path = Paths.get(filePath);
        if (!Files.exists(path)) {
            throw new IllegalStateException(String.format(DIRECTORY_DOES_NOT_EXIST, fileSystemConfig.getDirectory()));
        }
        try {
            return Files.newInputStream(path);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file: " + filePath, e);
        }
    }



}

