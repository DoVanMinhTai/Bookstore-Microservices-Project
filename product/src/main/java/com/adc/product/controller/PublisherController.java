package com.adc.product.controller;


import com.adc.product.model.BookPublisher;
import com.adc.product.respository.BookPublisherRespository;
import com.adc.product.service.BookPublisherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class PublisherController {
    private BookPublisherRespository bookPublisherRespository;
    private final BookPublisherService bookPublisherService;

    public PublisherController(BookPublisherService bookPublisherService) {
        this.bookPublisherService = bookPublisherService;
    }


    @PostMapping("/addPublisher")
    public BookPublisher save(@RequestBody BookPublisher bookPublisher) {
        return bookPublisherRespository.save(bookPublisher);
    }
    @GetMapping("/findAllBookByPulisher")
    public List<BookPublisher> findAllBookByPulisher() {
        return bookPublisherService.findAll();
    }
}
