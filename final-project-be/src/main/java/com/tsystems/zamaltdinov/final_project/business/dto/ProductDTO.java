package com.tsystems.zamaltdinov.final_project.business.dto;


import java.io.Serializable;
import java.util.UUID;

public class ProductDTO implements Serializable {

    private UUID id;
    private Integer categoryId;
    private String title;
    private Integer price;
    private String parameters;
    private String weight;
    private String volume;
    private Integer quantityInStock;

    public ProductDTO() {
    }

    public ProductDTO(UUID id, Integer categoryId, String title, Integer price, String parameters, String weight,
                      String volume, Integer quantityInStock) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.price = price;
        this.parameters = parameters;
        this.weight = weight;
        this.volume = volume;
        this.quantityInStock = quantityInStock;
    }
}
