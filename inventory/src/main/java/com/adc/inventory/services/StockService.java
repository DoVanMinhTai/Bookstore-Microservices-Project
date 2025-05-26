package com.adc.inventory.services;

import com.adc.commonlibrary.exception.NotFoundException;
import com.adc.inventory.model.Stock;
import com.adc.inventory.model.WareHouse;
import com.adc.inventory.model.enumeration.FilterExitsInWhSelection;
import com.adc.inventory.repository.StockHistoryRepository;
import com.adc.inventory.repository.StockRepository;
import com.adc.inventory.repository.WareHouseRepository;
import com.adc.inventory.viewmodel.product.ProductQuantityPostVm;
import com.adc.inventory.viewmodel.stock.StockPostVm;
import com.adc.inventory.viewmodel.product.ProductInfo;
import com.adc.inventory.viewmodel.stock.StockQuantityUpdateVm;
import com.adc.inventory.viewmodel.stock.StockQuantityVm;
import com.adc.inventory.viewmodel.stock.StockVm;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final WareHouseRepository wareHouseRepository;
    private final StockHistoryRepository stockHistoryRepository;
    private final ProductService productService;
    private final WareHouseService wareHouseService;
    private final StockHistoryService stockHistoryService;

    /*     Steps:
     *           1.check warehouseid and productid
     *               if exists => throw
     *           2.check product exist
     *               if not exists => throw
     *           3.check warehouse exist
     *               if not exists => throw
     * */
    public void addProductIntoWareHouse(List<StockPostVm> postVms) {
        List<Stock> stocks = postVms.stream().map(postVm -> {
            boolean existWareHouseIdAndProductId = stockRepository.existsByWareHouseIdAndProductId(postVm.wareHouseId(), postVm.productId());
            if (existWareHouseIdAndProductId) {
                try {
                    throw new Exception("exists stock");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }

            ProductInfo productInfo = productService.getProduct(postVm.productId());
            if (productInfo == null) {
                throw new NotFoundException("product not found");
            }

            Optional<WareHouse> wareHouse = wareHouseRepository.findById(postVm.wareHouseId());
            if (wareHouse.isPresent()) {
                throw new NotFoundException("warehouse not found");
            }
            return Stock.builder().productId(postVm.productId())
                    .wareHouse(wareHouse.get())
                    .quantity(0L)
                    .reversedQuantity(0L)
                    .build();
        }).toList();
        stockRepository.saveAll(stocks);
    }

    public List<StockVm> getStocksByWarehouseIdAndProductNameAndSku(Long warehouseId, String productName, String productSku) {

        HashMap<Long, ProductInfo> productInfoHashMap = (HashMap<Long, ProductInfo>) wareHouseService.getProductWarehouse(warehouseId, productName, productSku, FilterExitsInWhSelection.YES)
                .parallelStream()
                .collect(Collectors.toMap(ProductInfo::id, productInfo -> productInfo));


        List<Stock> stocks = stockRepository.findAllByWareHouseIdAndProductIdIn(warehouseId
                , productInfoHashMap.values().parallelStream().map(ProductInfo::id).toList());

        return stocks.stream().map(
                stock -> {
                    ProductInfo productInfo = productInfoHashMap.get(stock.getProductId());

                    return StockVm.fromModel(stock, productInfo);
                }
        ).toList();


    }


    public void updateProductQuantityInStock(final StockQuantityUpdateVm requestBody) {
        List<StockQuantityVm> stockQuantityVms = requestBody.stockQuantityVmList();
        List<Stock> stocks = stockRepository.findAllById(stockQuantityVms.parallelStream().map(StockQuantityVm::stockId).toList());

        for (final Stock stock : stocks) {
            StockQuantityVm stockQuantityVm = stockQuantityVms.parallelStream()
                    .filter(current -> current.stockId().equals(stock.getId()))
                    .findFirst()
                    .orElse(null);

            if (stockQuantityVm == null) {
                continue;
            }

            Long adjustedQuantity = stockQuantityVm.quantity() != null ? stockQuantityVm.quantity() : 0L;

            stock.setQuantity(stockQuantityVm.quantity() + adjustedQuantity);
        }
        stockRepository.saveAll(stocks);
        stockHistoryService.createStockHistories(stocks,stockQuantityVms);

        List<ProductQuantityPostVm> productQuantityPostVms = stocks.parallelStream()
                .map(ProductQuantityPostVm::fromModel)
                .toList();

        if (!productQuantityPostVms.isEmpty()) {
            productService.updateQuantity(productQuantityPostVms);
        }


    }
}
