package com.adc.media.viewmodel;

import lombok.Builder;

@Builder
public record MetaData(
        Long id,String caption, String fileName,String mediaType)
 {
}
