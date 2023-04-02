package com.tsystems.zamaltdinov.final_project.business.dto;

import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

public class CategoryDTO implements Serializable {
    private int id;
    private String categoryName;

    public CategoryDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
