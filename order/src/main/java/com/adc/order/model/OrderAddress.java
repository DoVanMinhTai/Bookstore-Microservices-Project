package com.adc.order.model;

import com.adc.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class OrderAddress extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contactName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String zipCode;
    private Long districtId;
    private String districtName;
    private Long stateOrProvinceId;
    private String stateOrProvinceName;
    private Long countryId;
    private String countryName;

}
