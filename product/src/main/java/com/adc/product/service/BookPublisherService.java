package com.adc.product.service;

import com.adc.product.model.BookPublisher;
import com.adc.product.respository.BookPublisherRespository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookPublisherService {

    private final BookPublisherRespository bookPublisherRespository;

    public BookPublisherService(BookPublisherRespository bookPublisherRespository) {
        this.bookPublisherRespository = bookPublisherRespository;
    }
        public List<BookPublisher> findAll() {
        return bookPublisherRespository.findAll();
        }

}




