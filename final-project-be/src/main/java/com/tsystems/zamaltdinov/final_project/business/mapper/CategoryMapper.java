package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.CategoryDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.CategoryEntity;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {
    CategoryMapper MAPPER = Mappers.getMapper(CategoryMapper.class);
    default CategoryEntity fromDTOToEntity(CategoryDTO categoryDTO){
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(categoryDTO.getId());
        categoryEntity.setCategory(categoryDTO.getCategory());
        return categoryEntity;
    }
    default CategoryDTO  fromEntityToDTO(CategoryEntity categoryEntity) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(categoryEntity.getId());
        categoryDTO.setCategory(categoryEntity.getCategory());

        return categoryDTO;
    }
    /*CategoryMapper MAPPER = Mappers.getMapper(CategoryMapper.class);
    CategoryEntity fromDTOToEntity(CategoryDTO categoryDTO);
    CategoryDTO fromEntityToDTO(CategoryEntity categoryEntity);*/
}
