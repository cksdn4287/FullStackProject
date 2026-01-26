package org.zeroc.backend.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zeroc.backend.domain.Product;
import org.zeroc.backend.domain.ProductImage;
import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.ProductDTO;
import org.zeroc.backend.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl  implements ProductService {

    private final ProductRepository productRepository;

    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO){

        log.info("getList.....................");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        Page<Object[]> result = productRepository.selectList(pageable);

        List<ProductDTO> dtoList = result.get().map(arr -> {

            Product product = (Product) arr[0];
            ProductImage productImage = (ProductImage) arr[1];

            ProductDTO productDTO = ProductDTO.builder()
                    .pno(product.getPno())
                    .pname(product.getPname())
                    .pdesc(product.getPdesc())
                    .price(product.getPrice())
                    .build();

            String imageStr = productImage.getFileName();
            productDTO.setUploadFileNames(List.of(imageStr));

            return  productDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
}
