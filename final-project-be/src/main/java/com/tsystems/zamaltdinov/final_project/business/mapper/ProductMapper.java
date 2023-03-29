package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {
    ProductMapper MAPPER = Mappers.getMapper(ProductMapper.class);
    default ProductEntity fromDTOToEntity(ProductDTO productDTO){
        ProductEntity productEntity = new ProductEntity();
        productEntity.setId(productDTO.getId());
        productEntity.setCategoryId(productDTO.getCategoryId());
        productEntity.setTitle(productDTO.getTitle());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setParameters(productDTO.getParameters());
        productEntity.setWeight(productDTO.getWeight());
        productEntity.setVolume(productDTO.getVolume());
        productEntity.setQuantityInStock(productDTO.getQuantityInStock());
        productEntity.setImageUrl(productDTO.getImageUrl());
        return productEntity;
    }

    default ProductDTO  fromEntityToDTO(ProductEntity productEntity) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(productEntity.getId());
        productDTO.setCategoryId(productEntity.getCategoryId());
        productDTO.setTitle(productEntity.getTitle());
        productDTO.setPrice(productEntity.getPrice());
        productDTO.setParameters(productEntity.getParameters());
        productDTO.setWeight(productEntity.getWeight());
        productDTO.setVolume(productEntity.getVolume());
        productDTO.setQuantityInStock(productEntity.getQuantityInStock());
        productDTO.setImageUrl(productEntity.getImageUrl());
        return productDTO;
    }
}
