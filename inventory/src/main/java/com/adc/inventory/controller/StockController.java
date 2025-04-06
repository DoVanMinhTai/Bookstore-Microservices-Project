package com.adc.inventory.controller;

import com.adc.inventory.model.Stock;
import com.adc.inventory.services.StockService;
import com.adc.inventory.viewmodel.stock.StockPostVm;
import com.adc.inventory.viewmodel.stock.StockQuantityUpdateVm;
import com.adc.inventory.viewmodel.stock.StockVm;
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
    ,productName,sku));
    }

    @PutMapping("/storefront/inventory/stock")
    public ResponseEntity<Void> updateStock(@RequestBody StockQuantityUpdateVm stockPostVms) {
        stockService.updateProductQuantityInStock(stockPostVms);
        return ResponseEntity.noContent().build();
    }

}
