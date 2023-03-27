package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {
    Optional<ProductDTO> findById(UUID id);
    void deleteById(UUID id);

    Optional<ProductDTO> update(UUID id, ProductDTO productDTO);


    ProductDTO save(ProductDTO productDTO);

    List<ProductDTO> findAllProducts();

}

    /*User findFirstByOrderByLastnameAsc();

    User findTopByOrderByAgeDesc();

    Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);

    Slice<User> findTop3ByLastname(String lastname, Pageable pageable);

    List<User> findFirst10ByLastname(String lastname, Sort sort);

    List<User> findTop10ByLastname(String lastname, Pageable pageable);*/