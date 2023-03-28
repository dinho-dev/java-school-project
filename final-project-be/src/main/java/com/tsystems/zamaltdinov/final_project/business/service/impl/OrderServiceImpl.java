package com.tsystems.zamaltdinov.final_project.business.service.impl;

import com.tsystems.zamaltdinov.final_project.business.dto.CreateOrderWithProductsDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.business.mapper.OrderMapper;
import com.tsystems.zamaltdinov.final_project.business.mapper.ProductMapper;
import com.tsystems.zamaltdinov.final_project.business.service.OrderService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderProductEntity;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderProductEntityPK;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ProductEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.OrderProductRepository;
import com.tsystems.zamaltdinov.final_project.transactional.repository.OrderRepository;
import com.tsystems.zamaltdinov.final_project.transactional.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {


    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final OrderProductRepository orderProductRepository;


    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, OrderProductRepository orderProductRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    public Optional<OrderDTO> findById(UUID id) {
        Optional<OrderEntity> orderEntity = orderRepository.findById(id);
        if (orderEntity.isEmpty()) {
            return Optional.empty();
        }

        List<UUID> productIDs = new ArrayList<>();
        orderEntity.get().getOrderProductsById().forEach(orderProductEntity -> {
            productIDs.add(orderProductEntity.getProductId());
        });


        List<ProductEntity> products = productRepository.findAllById(productIDs);
        List<ProductDTO> productDTOs = new ArrayList<>();
        products.forEach(productEntity -> {
            productDTOs.add(ProductMapper.MAPPER.fromEntityToDTO(productEntity));
        });

        OrderDTO orderDTO = OrderMapper.MAPPER.fromEntityToDTO(orderEntity.get());
        orderDTO.setProducts(productDTOs);

        return Optional.of(orderDTO);
    }

    @Override
    public void deleteById(UUID id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Optional<OrderDTO> update(UUID id, OrderDTO order) {

        Optional<OrderEntity> orderData = orderRepository.findById(id);

        if (orderData.isPresent()) {
            OrderEntity orderEntity = OrderMapper.MAPPER.fromDTOToEntity(order);
            orderRepository.save(orderEntity);
            return Optional.of(OrderMapper.MAPPER.fromEntityToDTO(orderEntity));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public OrderDTO save(OrderDTO order) {
        OrderEntity orderEntity = OrderMapper.MAPPER.fromDTOToEntity(order);
        orderRepository.save(orderEntity);
        return OrderMapper.MAPPER.fromEntityToDTO(orderEntity);
    }

    @Override
    public List<OrderDTO> findAllOrders() {
        List<OrderEntity> orders = orderRepository.findAll();
        List<OrderDTO> result = new ArrayList<>();
        for (OrderEntity order : orders) {
            result.add(OrderMapper.MAPPER.fromEntityToDTO(order));
        }
        return result;

    }

    @Override
    public OrderDTO createOrderWithProductsDTO(CreateOrderWithProductsDTO order) {

        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(UUID.randomUUID());
        final OrderEntity savedOrder = orderRepository.save(orderEntity);

        List<OrderProductEntity> orderProductEntities = new ArrayList<>();
        order.getProducts().forEach(productDTO -> {
            OrderProductEntity orderProductEntity = new OrderProductEntity();
            orderProductEntity.setOrderId(savedOrder.getId());
            orderProductEntity.setProductId(productDTO.getId());
            orderProductEntities.add(orderProductEntity);
        });
        orderProductRepository.saveAll(orderProductEntities);

        OrderDTO orderDTO = OrderMapper.MAPPER.fromEntityToDTO(savedOrder);
        orderDTO.setProducts(order.getProducts());
        return orderDTO;
    }
}
