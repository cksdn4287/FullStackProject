package org.zeroc.backend.service;

import org.springframework.transaction.annotation.Transactional;
import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.ProductDTO;

@Transactional
public interface ProductService {

    PageResponseDTO<ProductDTO>  getList(PageRequestDTO pageRequestDTO);
}
