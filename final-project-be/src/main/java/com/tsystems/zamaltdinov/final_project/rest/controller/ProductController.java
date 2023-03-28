package com.tsystems.zamaltdinov.final_project.rest.controller;

import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.business.service.ProductService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5432")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    ProductService productService;
    @GetMapping
    public List<ProductDTO> findAllProducts() {
        List <ProductDTO> productsTest = productService.findAllProducts();
        productsTest.forEach(productDTO -> {
            productDTO.setImageUrl("https://cdn.shopify.com/s/files/1/0036/4806/1509/products/4873dc4bb3b62e3e25b5462f15339e7cfa653065_square2963405_1_1000x.jpg?v=1677222980");
        });
        return productsTest;
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") UUID id) {
        Optional<ProductDTO> productData = productService.findById(id);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            ProductDTO _product = productService.save(productDTO);
            return new ResponseEntity<>(_product, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // TODO: create add to cart order
    @PostMapping("/{id}/add-to-cart")
    public ResponseEntity<HttpStatus> addToCart(@PathVariable("id") UUID id) {
        try {
            ProductDTO productDTO = productService.findById(id).get();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") UUID id, @RequestBody ProductDTO productDTO) {
        Optional<ProductDTO> productData = productService.update(id, productDTO);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") UUID id) {
        try {
            productService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

