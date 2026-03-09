package com.adc.product.respository;

import com.adc.product.model.Cate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenreRespository extends JpaRepository<Cate, Long> {
    List<Cate> findAll();
    Cate save(Cate cate);
    void delete(Cate cate);

}
