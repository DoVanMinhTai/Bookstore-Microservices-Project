package com.adc.product.respository;

import com.adc.product.model.BookPublisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookPublisherRespository extends JpaRepository<BookPublisher,Long> {
    BookPublisher save(BookPublisher bookPublisher);
    void delete(BookPublisher bookPublisher);
    List<BookPublisher> findAll();
    Optional<BookPublisher> findById(Long aLong);
}
