package com.tsystems.zamaltdinov.final_project.business.service.impl;

import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.business.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    @Override
    public Optional<OrderDTO> findById(UUID id) {
        return Optional.empty();
    }

    @Override
    public void deleteById(UUID id) {}

    @Override
    public Optional<OrderDTO> update(UUID id, OrderDTO order) {
        return Optional.empty();
    }

    @Override
    public OrderDTO save(OrderDTO order) {
        return null;
    }

    @Override
    public List<OrderDTO> findAllOrders() {
        return null;
    }
}
