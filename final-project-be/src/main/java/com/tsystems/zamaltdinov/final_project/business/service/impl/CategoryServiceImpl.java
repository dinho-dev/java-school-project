package com.tsystems.zamaltdinov.final_project.business.service.impl;


import com.tsystems.zamaltdinov.final_project.business.dto.CategoryDTO;
import com.tsystems.zamaltdinov.final_project.business.mapper.CategoryMapper;
import com.tsystems.zamaltdinov.final_project.business.service.CategoryService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.CategoryEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<CategoryDTO> findById(Integer id) {
        Optional<CategoryEntity> categoryEntity = repository.findById(id);
        return categoryEntity.map(CategoryMapper.MAPPER::fromEntityToDTO);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<CategoryDTO> update(Integer id, CategoryDTO categoryDTO) {

        Optional<CategoryEntity> categoryData = repository.findById(id);

        if (categoryData.isPresent()) {
            CategoryEntity categoryEntity = CategoryMapper.MAPPER.fromDTOToEntity(categoryDTO);
            repository.save(categoryEntity);
            return Optional.of(CategoryMapper.MAPPER.fromEntityToDTO(categoryEntity));
        } else {
            return Optional.empty();
        }

    }

    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        CategoryEntity categoryEntity = CategoryMapper.MAPPER.fromDTOToEntity(categoryDTO);
        repository.save(categoryEntity);
        return CategoryMapper.MAPPER.fromEntityToDTO(categoryEntity);
    }

    @Override
    public List<CategoryDTO> findAllCategories() {
        List<CategoryEntity> categoryEntityList = repository.findAll();
        List<CategoryDTO> result = new ArrayList<>();
        for (CategoryEntity  category:categoryEntityList) {
            result.add(CategoryMapper.MAPPER.fromEntityToDTO(category));
        }
        return result;
    }
}
