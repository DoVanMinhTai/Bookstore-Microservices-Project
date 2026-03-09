package com.adc.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Cate extends AbstractAuditEntity {


    @Id
    private Long id;

    private String name;

    private String description;

    private boolean active;

    @OneToMany(mappedBy = "cate")
    @JsonIgnore
    private List<BookCate> bookCate = new ArrayList<>();

}
