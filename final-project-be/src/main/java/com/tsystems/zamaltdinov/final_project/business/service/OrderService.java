package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.CreateOrderWithProductsDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {
    Optional<OrderDTO> findById(UUID id);

    void deleteById(UUID id);

    Optional<OrderDTO> update(UUID id, OrderDTO order);


    OrderDTO save(OrderDTO order);

    List<OrderDTO> findAllOrders();
    List<OrderDTO> findAllByUserId(UUID userId);

    OrderDTO createOrderWithProductsDTO(CreateOrderWithProductsDTO order);
}
