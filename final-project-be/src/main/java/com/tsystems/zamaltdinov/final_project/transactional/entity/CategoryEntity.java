package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "category", schema = "store", catalog = "postgres")
public class CategoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(columnDefinition = "serial")
    private int id;
    @Basic
    @Column(name = "category")
    private String category;
    @OneToMany(mappedBy = "categoryByCategoryId")
    private Collection<ProductEntity> productsById;

    public CategoryEntity() {
    }
    public CategoryEntity(int id, String category, Collection<ProductEntity> productsById) {
        this.id = id;
        this.category = category;
        this.productsById = productsById;
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


    public Collection<ProductEntity> getProductsById() {
        return productsById;
    }

    public void setProductsById(Collection<ProductEntity> productsById) {
        this.productsById = productsById;
    }
}
