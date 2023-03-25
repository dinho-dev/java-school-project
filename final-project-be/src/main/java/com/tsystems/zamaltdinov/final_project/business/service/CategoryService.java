package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.CategoryDTO;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Optional<CategoryDTO> findById(Integer id);

    void deleteById(Integer id);

    Optional<CategoryDTO> update(Integer id, CategoryDTO categoryDTO);

    CategoryDTO save(CategoryDTO categoryDTO);

    List<CategoryDTO> findAllCategories();
}
