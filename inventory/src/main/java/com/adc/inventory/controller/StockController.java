package com.adc.inventory.controller;

import com.adc.inventory.services.StockService;
import com.adc.inventory.viewmodel.stock.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class StockController {
    private final StockService stockService;

    @PostMapping("/storefront/inventory/stock")
    public ResponseEntity<Void> addProductIntoWareHouse(@RequestBody List<StockPostVm> stockPostVms) {
        stockService.addProductIntoWareHouse(stockPostVms);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/storefront/inventory/stock")
    public ResponseEntity<List<StockVm>> getStocksByOptions(
            @RequestParam(name = "warehouseId") Long wareHouseId,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String sku
    ) {
        return ResponseEntity.ok(stockService.getStocksByWarehouseIdAndProductNameAndSku(wareHouseId
                , productName, sku));
    }

    @PutMapping("/storefront/inventory/updateStock")
    public ResponseEntity<Void> updateStock(@RequestBody StockQuantityUpdateVm stockPostVms) {
        stockService.updateProductQuantityInStock(stockPostVms);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/storefront/inventory/reduceStock")
    public ResponseEntity<Void> reduceStock(@RequestBody List<StockDeleteVm> stockDeleteVms) {
        stockService.reduceStock(stockDeleteVms);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reserve")
    public ResponseEntity<Void> reserveStock(@RequestBody List<StockReservationVm> reservationVms) {
        for (StockReservationVm vm : reservationVms) {
            stockService.reserveStock(vm.productId(), vm.warehouseId(), (long) vm.quantity());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/release")
    public ResponseEntity<Void> releaseStock(@RequestBody List<StockReservationVm> reservationVms) {
        for (StockReservationVm vm : reservationVms) {
            stockService.releaseStock(vm.productId(), vm.warehouseId(), (long) vm.quantity());
        }
        return ResponseEntity.ok().build();
    }
}
