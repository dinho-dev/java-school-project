package com.tsystems.zamaltdinov.final_project.transactional.repository;

import com.tsystems.zamaltdinov.final_project.transactional.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}
