package com.adc.cart.service;

import com.adc.cart.mapper.CartItemMapper;
import com.adc.cart.model.CartItem;
import com.adc.cart.repository.CartItemRepository;
import com.adc.cart.utils.Constant;
import com.adc.cart.viewmodel.CartItemDeleteVms;
import com.adc.cart.viewmodel.CartItemGetVm;
import com.adc.cart.viewmodel.CartItemPost;
import com.adc.cart.viewmodel.CartItemPutVm;
import com.adc.commonlibrary.exception.NotFoundException;
import com.adc.commonlibrary.utils.AuthenticationUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    private final CartItemMapper cartItemMapper;

    @Transactional
    public CartItemGetVm addCartItem(CartItemPost cartItemPostVm) {
        validateProduct(cartItemPostVm.productId());
        String currentUser = AuthenticationUtils.extractUserId();
        CartItem cartItem = performAddCartItem(cartItemPostVm, currentUser);
        return cartItemMapper.toGetVm(cartItem);
    }

    @Transactional
    public CartItemGetVm updateCartItem(Long productId, CartItemPutVm cartItemPutVm) {
        String currentUser = AuthenticationUtils.extractUserId();
        CartItem cartItem = cartItemRepository.findByCustomerIdAndProductId(currentUser, productId)
                .orElseThrow(() -> new NotFoundException(Constant.ErrorCode.CART_ITEM_NOT_FOUND + "FOR:", productId, currentUser));
        int quantity = cartItemPutVm.quantity();
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        return cartItemMapper.toGetVm(cartItem);
    }

    @Transactional(readOnly = true)
    public List<CartItemGetVm> getCartItems() {
        String currentUserId = AuthenticationUtils.extractUserId();
        List<CartItem> listCartItemByIdUser = cartItemRepository.findByCustomerIdOrderByCreatedOnDesc(currentUserId);
        return cartItemMapper.toGetVms(listCartItemByIdUser);
    }

    @Transactional
    public void deleteCartItem(Long productId) {
        String currentUserId = AuthenticationUtils.extractUserId();
        cartItemRepository.deleteByCustomerIdAndProductId(currentUserId, productId);
    }

    @Transactional
    public List<CartItemGetVm> deleteOrAdjustCartItem(List<CartItemDeleteVms> cartItemDeleteVms) {
        List<CartItem> updateAdjust = new ArrayList<>();
        List<CartItem> deleteItems = new ArrayList<>();
        Map<Long, CartItem> cartGetById = mapCartItemToProductId(cartItemDeleteVms);

        for (CartItemDeleteVms cartItemDelete : cartItemDeleteVms) {
            Optional<CartItem> optionalCartItem = Optional.ofNullable(cartGetById.get(cartItemDelete.productId()));
            optionalCartItem.ifPresent(cartItem -> {
                if (cartItemDelete.quantity() >= cartItem.getQuantity()) {
                    deleteItems.add(cartItem);
                } else {
                    cartItem.setQuantity(cartItem.getQuantity() - cartItemDelete.quantity());
                    updateAdjust.add(cartItem);
                }
            });
        }

        cartItemRepository.deleteAll(deleteItems);
        List<CartItem> updateCartItem = cartItemRepository.saveAll(updateAdjust);
        return cartItemMapper.toGetVms(updateCartItem);
    }

    private Map<Long, CartItem> mapCartItemToProductId(List<CartItemDeleteVms> cartItemDeleteVms) {
        String currentUserId = AuthenticationUtils.extractUserId();
        List<Long> productIds = cartItemDeleteVms.stream().map(CartItemDeleteVms::productId).toList();
        List<CartItem> cartItems = cartItemRepository.findByCustomerIdAndProductIdIn(currentUserId, productIds);
        return cartItems.stream().collect(Collectors.toMap(CartItem::getProductId, Function.identity()));
    }

    private CartItem performAddCartItem(CartItemPost cartItemPostVm, String currentUser) {
        return (CartItem) cartItemRepository.findByCustomerIdAndProductId(currentUser, cartItemPostVm.productId())
                .map(existCartItem -> updateExisttingCartItem(cartItemPostVm, existCartItem))
                .orElseGet(() -> createNewCartItem(cartItemPostVm, currentUser));
    }

    private CartItem createNewCartItem(CartItemPost cartItemPostVm, String currentUser) {
        CartItem cartItem = cartItemMapper.toCartItem(cartItemPostVm, currentUser);
        return cartItemRepository.save(cartItem);
    }

    private CartItem updateExisttingCartItem(CartItemPost cartItemPostVm, CartItem existCartItem) {
        existCartItem.setQuantity(existCartItem.getQuantity() + cartItemPostVm.quantity());
        return cartItemRepository.save(existCartItem);
    }

    private void validateProduct(Long idProduct) {
        if (!productService.existsProduct(idProduct)) {
            throw new NotFoundException(Constant.ErrorCode.PRODUCT_NOT_FOUND, idProduct);
        }
    }
}
