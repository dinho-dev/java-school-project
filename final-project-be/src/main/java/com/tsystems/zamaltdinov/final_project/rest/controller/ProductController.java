package com.tsystems.zamaltdinov.final_project.rest.controller;

import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.business.service.OrderService;
import com.tsystems.zamaltdinov.final_project.business.service.ProductService;
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
    OrderService orderService;
    @GetMapping
    public List<OrderDTO> findAllOrders() {
        return orderService.findAllOrders();
    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getClientById(@PathVariable("id") UUID id) {
        Optional<OrderDTO> orderData = orderService.findById(id);

        if (orderData.isPresent()) {
            return new ResponseEntity<>(orderData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createClient(@RequestBody OrderDTO order) {
        try {
            OrderDTO _client = orderService.save(order);
            return new ResponseEntity<>(_client, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateClient(@PathVariable("id") UUID id, @RequestBody OrderDTO order) {
        Optional<OrderDTO> orderData = orderService
                .update(id, order);

        if (orderData.isPresent()) {
            return new ResponseEntity<>(orderData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteClient(@PathVariable("id") UUID id) {
        try {
            orderService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

