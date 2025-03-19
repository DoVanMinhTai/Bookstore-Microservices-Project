package com.adc.cart.service;

import com.adc.cart.mapper.CartItemMapper;
import com.adc.cart.model.CartItem;
import com.adc.cart.repository.CartItemRepository;
import com.adc.cart.viewmodel.CartItemDeteleVms;
import com.adc.cart.viewmodel.CartItemGetVm;
import com.adc.cart.viewmodel.CartItemPost;
import com.adc.cart.viewmodel.CartItemPutVm;
import com.adc.commonlibrary.exception.NotFoundException;
import com.adc.commonlibrary.utils.AuthenticationUtils;
import com.adc.commonlibrary.utils.MessagesUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.adc.commonlibrary.constants.*;

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


    //    Kiểm tra sản phẩm có tồn tại không (validateProduct).
//    Lấy userId từ SecurityContext bằng AuthenticationUtils.extractUserId().
//    Gọi performAddCartItem để xử lý thêm sản phẩm vào giỏ hàng (nếu sản phẩm đã có thì tăng số lượng, nếu chưa có thì thêm mới).
//    lưu lại
//    Trả về đối tượng CartItemGetVm (View Model chứa thông tin giỏ hàng).
    @Transactional
    public CartItemGetVm addCartItem(CartItemPost cartItemPostVm) {
//        validateProduct(cartItemPostVm.productId());

        String currentUser = AuthenticationUtils.extractUserId();
        System.out.println(currentUser);
        CartItem cartItem = performAddCartItem(cartItemPostVm, currentUser);

        return cartItemMapper.toGetVm(cartItem);
    }

    @Transactional
    public CartItemGetVm updateCartItem(Long productId, CartItemPutVm cartItemPutVm) {
//        validateProduct(productId);

        String currentUser = AuthenticationUtils.extractUserId();
        CartItem cartItem = cartItemMapper.toCartItem(currentUser, productId, cartItemPutVm.quantity());

        cartItemRepository.save(cartItem);
        return cartItemMapper.toGetVm(cartItem);

    }

    @Transactional
    public List<CartItemGetVm> getCartItems() {
        String currentUserId = AuthenticationUtils.extractUserId();

        List<CartItem> listCartItemByIdUser = cartItemRepository.findByCustomerId(currentUserId);
        return cartItemMapper.toGetVms(listCartItemByIdUser);
    }

    @Transactional
    public void deleteCartItem(Long productId) {
        String currentUserId = AuthenticationUtils.extractUserId();
        cartItemRepository.deleteByCustomerIdAndProductId(currentUserId, productId);
    }

//    delete all or reduce quantity
//    muc tieu la giam so luong hoac xoa san pham
//    ham nhan vao id product va quantity
//      se có 2 luồng xày ra có thể là giảm hoac  xóa
//          lấy số lượng trong database và kiểm tra
//

    @Transactional
    public List<CartItemGetVm> deleteOrAdjustCartItem(List<CartItemDeteleVms> cartItemDeteleVms) {
//        validate cartitem

        List<CartItem> updateAdjust = new ArrayList<>();
        List<CartItem> deleteItems = new ArrayList<>();
        Map<Long, CartItem> cartGetById = mapCartItemToProductId(cartItemDeteleVms);

        for (CartItemDeteleVms cartItemDetele : cartItemDeteleVms) {
            Optional<CartItem> optionalCartItem = Optional.of(cartGetById.get(cartItemDetele.productId()));
            optionalCartItem.ifPresent(cartItem -> {
                if (cartItemDetele.quantity() >= cartItem.getQuantity()) {
                    deleteItems.add(cartItem);
                } else {
                    cartItem.setQuantity(cartItem.getQuantity() - cartItemDetele.quantity());
                    updateAdjust.add(cartItem);
                }
            });
        }

        cartItemRepository.deleteAll(deleteItems);
        List<CartItem> updateCartItem = cartItemRepository.saveAll(updateAdjust);
        return cartItemMapper.toGetVms(updateCartItem);


    }

    private Map<Long, CartItem> mapCartItemToProductId(List<CartItemDeteleVms> cartItemDeteleVms) {
        String currentUserId = AuthenticationUtils.extractUserId();
        List<Long> productIds = cartItemDeteleVms.stream().map(CartItemDeteleVms::productId).toList();
        System.out.println("productId" + productIds);
        List<CartItem> cartItems = cartItemRepository.findByCustomerIdAndProductIdIn(currentUserId, productIds);
        System.out.println(cartItems);
        return cartItems.stream().collect(Collectors.toMap(CartItem::getProductId, Function.identity()));


    }


    //check database xem da co ban ghi chua, chua thi minh tao , con rooi thi se tang quantity
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
        if (!productService.exitstProduct(idProduct)) {
            throw new NotFoundException("NOT EXITST PRODUCT", idProduct);

        }
    }
}
