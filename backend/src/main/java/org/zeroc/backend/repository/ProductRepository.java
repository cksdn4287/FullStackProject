package org.zeroc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zeroc.backend.domain.Product;

public interface ProductRepository  extends JpaRepository<Product, Long> {
}
