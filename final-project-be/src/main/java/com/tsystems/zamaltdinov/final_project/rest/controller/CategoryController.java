package com.tsystems.zamaltdinov.final_project.rest.controller;

import java.util.List;
import java.util.Optional;

import com.tsystems.zamaltdinov.final_project.business.dto.CategoryDTO;
import com.tsystems.zamaltdinov.final_project.business.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> findAllCategories() {
        return categoryService.findAllCategories();
    }
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable("id") int id) {
        Optional<CategoryDTO> categoryData = categoryService.findById(id);

        if (categoryData.isPresent()) {
            return new ResponseEntity<>(categoryData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO category) {
        try {
            CategoryDTO _category = categoryService.save(category);
            return new ResponseEntity<>(_category, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable("id") int id, @RequestBody CategoryDTO category) {
        Optional<CategoryDTO> categoryData = categoryService.update(id, category);

        if (categoryData.isPresent()) {
            return new ResponseEntity<>(categoryData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") int id) {
        try {
            categoryService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
