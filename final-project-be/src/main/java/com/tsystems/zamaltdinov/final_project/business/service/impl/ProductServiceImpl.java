package com.tsystems.zamaltdinov.final_project.business.service.impl;


import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.business.mapper.ProductMapper;
import com.tsystems.zamaltdinov.final_project.business.service.ProductService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<ProductDTO> findById(UUID id) {
        Optional<ProductEntity> productEntity = repository.findById(id);
        return productEntity.map(ProductMapper.MAPPER::fromEntityToDTO);
    }

    @Override
    public void deleteById(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<ProductDTO> update(UUID id, ProductDTO productDTO) {

        Optional<ProductEntity> productData = repository.findById(id);

        if (productData.isPresent()) {
            ProductEntity productEntity = ProductMapper.MAPPER.fromDTOToEntity(productDTO);
            repository.save(productEntity);
            return Optional.of(ProductMapper.MAPPER.fromEntityToDTO(productEntity));
        } else {
            return Optional.empty();
        }

    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        ProductEntity productEntity = ProductMapper.MAPPER.fromDTOToEntity(productDTO);
        repository.save(productEntity);
        return ProductMapper.MAPPER.fromEntityToDTO(productEntity);
    }

    @Override
    public List<ProductDTO> findAllProducts() {
        List<ProductEntity> productEntityList = repository.findAll();
        List<ProductDTO> result = new ArrayList<>();
        for (ProductEntity product:productEntityList) {
            result.add(ProductMapper.MAPPER.fromEntityToDTO(product));
        }
        return result;
    }
}

