package com.adc.media.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "media")
@Entity
@Getter
@Setter
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String caption;
    private String fileName;
    private String filePath;
    private String mediaType;
}
