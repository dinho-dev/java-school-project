package com.tsystems.zamaltdinov.final_project.business.dto;

import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

public class CategoryDTO implements Serializable {
    private int id;
    private String category;

    public CategoryDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
