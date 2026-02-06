package org.zeroc.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.zeroc.backend.domain.Cart;
import org.zeroc.backend.domain.CartItem;
import org.zeroc.backend.domain.Member;
import org.zeroc.backend.domain.Product;
import org.zeroc.backend.dto.CartItemDTO;
import org.zeroc.backend.dto.CartItemListDTO;
import org.zeroc.backend.repository.CartItemRepository;
import org.zeroc.backend.repository.CartRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Log4j2
public class CartServiceImpl implements  CartService{

    private  final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO){

        String email = cartItemDTO.getEmail();

        Long pno = cartItemDTO.getPno();

        int qty = cartItemDTO.getQty();

        Long cino = cartItemDTO.getCino();
        //장바구니 아이쳄 번호가 있어서 수량만 변경하는 경우
        if(cino != null){
            Optional<CartItem> cartItemResult = cartItemRepository.findById(cino);

            CartItem cartItem = cartItemResult.orElseThrow();

            cartItem.changeQty(qty);
            cartItemRepository.save(cartItem);

            return  getCartItems(email);
        }

        //장바구니 아이템 번호 cino가 없는 경우

        //사용자의 카트
        Cart cart = getCart(email);

        CartItem cartItem = null;

        //이미 동일한 사웊ㅁ이 담긴적이 있을 수 있으므로
        cartItem = cartItemRepository.getItemOfPno(email , pno);

        if(cartItem == null){
            Product product = Product.builder().pno(pno).build()
;
        cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();

        }else{
            cartItem.changeQty(qty);
        }

        //상품 아이템 저장
        cartItemRepository.save(cartItem);

        return  getCartItems(email);

    }

//사용자의 장바구니가 없었다면 새로운 장바구니를 생성하고 반환
private  Cart getCart(String email){

        Cart cart = null;

        Optional<Cart> result = cartRepository.getCartOfMember(email);

        if(result.isEmpty()){

            log.info("사용자의 장바구니가 없습니다!!!");

            Member member = Member.builder().email(email).build();

            Cart tempCart = Cart.builder().owner(member).build();

            cart = cartRepository.save(tempCart);
        }else{
            cart = result.get();
        }

        return  cart;
}

public List<CartItemListDTO> getCartItems(String email){
        return  cartItemRepository.getItemsOfCartDTOByEmail(email);
}

public List<CartItemListDTO> remove(Long cino){

        Long cno = cartItemRepository.getCartFromItem(cino);

        log.info("장바구니 번호 : " + cno);

        cartItemRepository.deleteById(cino);

        return  cartItemRepository.getItemsOfCartDTOByCart(cno);
}

}















