package com.adc.inventory.services;

import com.adc.inventory.model.WareHouse;
import com.adc.inventory.model.enumeration.FilterExitsInWhSelection;
import com.adc.inventory.repository.StockRepository;
import com.adc.inventory.repository.WareHouseRepository;
import com.adc.inventory.viewmodel.location.AddressPostVm;
import com.adc.inventory.viewmodel.location.AddressVm;
import com.adc.inventory.viewmodel.location.LocationGetVm;
import com.adc.inventory.viewmodel.product.ProductInfo;
import com.adc.inventory.viewmodel.warehouse.WareHousePostVm;
import com.adc.inventory.viewmodel.warehouse.WarehouseDetailVm;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.List;

@Service
@AllArgsConstructor
public class WareHouseService {
    private final StockRepository stockRepository;
    private final WareHouseRepository wareHouseRepository;
    private final ProductService productService;
    private final LocationService locationService;

    public List<ProductInfo> getProductWarehouse(Long warehouseId, String productName, String productSku, FilterExitsInWhSelection exitsInWhSelection) {
        List<Long> productIds = stockRepository.getByWareHouseId(warehouseId);

        List<ProductInfo> productInfos = productService.filterProducts(productName,productSku,productIds,exitsInWhSelection);

        if(!CollectionUtils.isEmpty(productIds)){
            return productInfos.stream().map(productInfo -> {
                return new ProductInfo(productInfo.id(),productInfo.name(),productInfo.sku()
                ,productIds.contains(productInfo.id())
                        );
            }).toList();
        }
        return productInfos;
    }

    public WarehouseDetailVm findById(final Long id) {
        WareHouse wareHouse = wareHouseRepository.findById(id).orElse(null);
        if(wareHouse == null){
            return null;
        }
        LocationGetVm locationGetVm = locationService.getAddressById(id);
        return new WarehouseDetailVm(
                wareHouse.getId(),
                wareHouse.getName(),
                locationGetVm.contactName(),
                locationGetVm.phone(),
                locationGetVm.addressLine1(),
                locationGetVm.addressLine2(),
                locationGetVm.city(),
                locationGetVm.zipcode(),
                locationGetVm.districtId(),
                locationGetVm.stateOrProvinceId(),
                locationGetVm.countryId()

        );


    }

    public WareHouse create(final WareHousePostVm wareHousePostVm) {
        if(wareHouseRepository.existsByName(wareHousePostVm.name())) {
            throw new RuntimeException("WareHouse already exists");
        }

        AddressPostVm addressPostVm = AddressPostVm.builder()
                .contactName(wareHousePostVm.contactName())
                .phone(wareHousePostVm.phone())
                .addressLine1(wareHousePostVm.addressLine1())
                .addressLine2(wareHousePostVm.addressLine2())
                .city(wareHousePostVm.city())
                .zipCode(wareHousePostVm.zipcode())
                .districtId(wareHousePostVm.districtId())
                .stateOrProvinceId(wareHousePostVm.stateOrProvinceId())
                .countryId(wareHousePostVm.countryId()).build();
        AddressVm addressGetVm = locationService.createAddress(addressPostVm);
        WareHouse wareHouse = WareHouse.builder()
                .name(wareHousePostVm.name())
                .addressId(addressGetVm.id()).build();
        wareHouseRepository.save(wareHouse);
        return wareHouse;
    }

    public void update(final WareHousePostVm wareHousePostVm, final Long id) {
        WareHouse wareHouse = wareHouseRepository.findById(id).orElse(null);
        if(wareHouse == null){
            throw new RuntimeException("WareHouse not found");
        }
        locationService.updateAddress(wareHouse.getAddressId(),wareHousePostVm);
        wareHouse.setName(wareHousePostVm.name());
        wareHouseRepository.save(wareHouse);
    }

    public void delete(final Long id) {
        wareHouseRepository.deleteById(id);
    }
}
