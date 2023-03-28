package com.tsystems.zamaltdinov.final_project.business.dto;

import java.io.Serializable;
import java.util.List;

public class CreateOrderWithProductsDTO implements Serializable {
    private List<ProductDTO> products;

    public CreateOrderWithProductsDTO() {
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

    public CreateOrderWithProductsDTO(List<ProductDTO> products) {
        this.products = products;
    }
}
