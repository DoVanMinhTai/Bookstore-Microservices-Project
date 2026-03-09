package com.adc.location.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "country")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 450)
    private String name;

    @Column(length = 2)
    private String code2;

    @Column(length = 3)
    private String code3;

    private Boolean isBillingEnabled;
    private Boolean isShippingEnabled;
    private Boolean isCityEnabled;
    private Boolean isZipCodeEnabled;
    private Boolean isDistrictEnabled;

    @OneToMany(mappedBy = "country")
    private List<StateOrProvince> stateOrProvinces = new ArrayList<>();

}
