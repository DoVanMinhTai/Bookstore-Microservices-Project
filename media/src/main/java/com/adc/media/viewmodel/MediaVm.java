package com.adc.media.viewmodel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaVm {
    private Long id;
    private String caption;
    private String fileName;
    private String mediaType;
    private String url;
    public MediaVm(Long id, String caption, String fileName, String mediaType
    , String url) {
        this.id = id;
        this.caption = caption;
        this.fileName = fileName;
        this.mediaType = mediaType;
        this.url = url;
    }
}
