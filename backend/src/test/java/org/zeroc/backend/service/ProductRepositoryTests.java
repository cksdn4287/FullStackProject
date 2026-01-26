package org.zeroc.backend.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;
import org.zeroc.backend.domain.Product;
import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.ProductDTO;
import org.zeroc.backend.repository.ProductRepository;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Test
    public void testInsert(){

        for(int i = 0; i < 10 ; i++){
            Product product = Product.builder()
                    .pname("상품" + i)
                    .price(100*i)
                    .pdesc("상품설명" + i)
                    .build();

            product.addImageString(UUID.randomUUID().toString()+"_" + "IMAGE1.jpg");
            product.addImageString(UUID.randomUUID().toString()+"_" + "IMAGE2.jpg");

            productRepository.save(product);

            log.info("--------------------------------");
        }
    }

    @Transactional
    @Test
    public void testRead(){

        Long pno = 1L;

        Optional<Product> result = productRepository.findById(pno);

        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getImageList());
    }

    @Test
    public void textRead2(){

        Long pno = 1L;

        Optional<Product>  result = productRepository.selectOne(pno);

        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getImageList());
    }

    @Commit
    @Transactional
    @Test
    public void textDelete(){

        Long pno = 3L;

        productRepository.updateToDelete(pno, true);
    }

    @Test
    public void testUpdate(){

        Long pno = 30L;

        Product product = productRepository.selectOne(pno).get();

        product.changeName("10번 상품");
        product.changeDesc("10번 상품 설명입니다");
        product.changePrice(5000);

        product.clearList();

        product.addImageString(UUID.randomUUID().toString()+"_"+"NEWIMAGE1.jpg");
        product.addImageString(UUID.randomUUID().toString()+"_"+"NEWIMAGE2.jpg");
        product.addImageString(UUID.randomUUID().toString()+"_"+"NEWIMAGE3.jpg");

        productRepository.save(product);
    }

    @Test
    public void testList(){

/*        Pageable pageable = PageRequest.of(0,10, Sort.by("pno").descending());

        Page<Object[]> result = productRepository.selectList(pageable);

        result.getContent().forEach(arr -> log.info(Arrays.toString(arr)));*/

        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();

        PageResponseDTO<ProductDTO> result = productService.getList(pageRequestDTO);

        result.getDtoList().forEach(dto -> log.info(dto));
    }








}
