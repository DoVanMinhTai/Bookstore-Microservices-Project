package com.adc.cart.repository;

import com.adc.cart.model.CartItem;
import com.adc.cart.model.CartItemId;
import com.adc.cart.viewmodel.CartItemGetVm;
import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, CartItemId> {


    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "0")})
    @Query("select c from CartItem c where c.customerId = :customerId and c.productId = :productId")
    Optional<CartItem> findByCustomerIdAndProductId(String customerId, Long productId);

    List<CartItem> findByCustomerIdOrderByCreatedOnDesc(String currentUserId);

    void deleteByCustomerIdAndProductId(String customerId, Long productId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "0")})
    @Query("SELECT ca from CartItem ca WHERE ca.customerId = :currentUserId and ca.productId IN :productIds")
    List<CartItem> findByCustomerIdAndProductIdIn(String currentUserId, List<Long> productIds);
}
