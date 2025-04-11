package com.adc.media.service;

import com.adc.media.config.AdcConfig;
import com.adc.media.config.FileSystemConfig;
import com.adc.media.model.Media;
import com.adc.media.model.dto.MediaDto;
import com.adc.media.repository.FileSystemRepository;
import com.adc.media.repository.MediaRepository;
import com.adc.media.viewmodel.MediaVm;
import com.adc.media.viewmodel.MetaData;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.InputStream;
import java.util.Optional;

@Service
@lombok.RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {
    private final FileSystemConfig fileSystemConfig;
    private final FileSystemRepository fileSystemRepository;
    private final MediaRepository mediaRepository;
    private final AdcConfig adcConfig;
    @Override
    public MediaDto getFile(Long id, String fileName) {
        MediaDto.MediaDtoBuilder builder = MediaDto.builder();

        Media media = mediaRepository.findById(id).orElse(null);
        if (!fileName.equalsIgnoreCase(media.getFileName()) || media == null) {
            return builder.build();
        }
            MediaType mediaType = MediaType.valueOf(media.getMediaType());
        System.out.println(media.getFilePath());
        InputStream fileContent = fileSystemRepository.getFile(media.getFilePath());
        return builder.content(fileContent).mediaType(mediaType).build();
    }

    @Override
    public MediaVm getMediaById(Long id) {
        MetaData metaData = mediaRepository.findByIdWithoutFileInReturn(id);
        System.out.println(metaData);
//        if(metaData == null) {
//            new ChangeSetPersister.NotFoundException();
//        }
        String url = getMediaUrl(metaData.id(),metaData.fileName());
        System.out.println("url: " + url);
        return new MediaVm(metaData.id(), metaData.caption(),
                metaData.fileName(), metaData.mediaType(),
                url);
    }

    private String getMediaUrl(Long id, String fileName) {
        System.out.println(id + " " + fileName);
        return UriComponentsBuilder.fromUriString(adcConfig.url())
                .path(String.format("media/{id}/file/{name}"))
                .buildAndExpand(id,fileName).toUriString();

    }


}
