package com.tsystems.zamaltdinov.final_project.business.service.impl;

import com.tsystems.zamaltdinov.final_project.business.dto.AddressDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.CreateOrderWithProductsDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;
import com.tsystems.zamaltdinov.final_project.business.mapper.AddressMapper;
import com.tsystems.zamaltdinov.final_project.business.mapper.OrderMapper;
import com.tsystems.zamaltdinov.final_project.business.mapper.ProductMapper;
import com.tsystems.zamaltdinov.final_project.business.service.OrderService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.*;
import com.tsystems.zamaltdinov.final_project.transactional.repository.OrderProductRepository;
import com.tsystems.zamaltdinov.final_project.transactional.repository.OrderRepository;
import com.tsystems.zamaltdinov.final_project.transactional.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
            OrderEntity existingOrder = orderData.get();
            existingOrder.setOrderStatus(orderEntity.getOrderStatus());
            orderRepository.save(existingOrder);
            return Optional.of(OrderMapper.MAPPER.fromEntityToDTO(orderEntity));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public OrderDTO save(OrderDTO order) {
        OrderEntity orderEntity = OrderMapper.MAPPER.fromDTOToEntity(order);
        orderRepository.save(orderEntity);


        List<UUID> productIDs = new ArrayList<>();
        order.getProducts().forEach( productDTO ->
                productIDs.add(productDTO.getId())
        );
        List<ProductEntity> products = productRepository.findAllById(productIDs);

        Collection<OrderProductEntity> orderProducts = new ArrayList<>();
        for (ProductEntity p : products  ) {
            OrderProductEntity productsOrder = new OrderProductEntity();
            productsOrder.setOrderId(orderEntity.getId());
            productsOrder.setProductId(p.getId());


            orderProductRepository.save(productsOrder);
            orderProducts.add(productsOrder);
        }

        orderEntity.setOrderProductsById(orderProducts);
        orderRepository.save(orderEntity);

        OrderDTO savedDto =  OrderMapper.MAPPER.fromEntityToDTO(orderEntity);
        savedDto.setProducts(order.getProducts());
        return savedDto;
    }

    @Override
    public List<OrderDTO> findAllOrders() {
        List<OrderEntity> orders = orderRepository.findAll();
        List<OrderDTO> result = new ArrayList<>();
        for (OrderEntity order : orders) {
            List<UUID> productIDs = new ArrayList<>();
            order.getOrderProductsById().forEach(orderProductEntity -> {
                productIDs.add(orderProductEntity.getProductId());
            });

            List<ProductEntity> products = productRepository.findAllById(productIDs);
            List<ProductDTO> productDTOs = new ArrayList<>();
            products.forEach(productEntity -> {
                productDTOs.add(ProductMapper.MAPPER.fromEntityToDTO(productEntity));
            });

            OrderDTO orderDTO = OrderMapper.MAPPER.fromEntityToDTO(order);
            orderDTO.setProducts(productDTOs);

            result.add(orderDTO);
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
            // orderProductEntity.setOrderId(savedOrder.getId());
            // orderProductEntity.setProductId(productDTO.getId());
            orderProductEntities.add(orderProductEntity);
        });
        orderProductRepository.saveAll(orderProductEntities);

        OrderDTO orderDTO = OrderMapper.MAPPER.fromEntityToDTO(savedOrder);
        orderDTO.setProducts(order.getProducts());
        return orderDTO;
    }
    public List<OrderDTO> findAllByUserId(UUID userId) {
        List<OrderEntity> orderEntities = orderRepository.findAllByUserId(userId);

        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (OrderEntity orderEntity : orderEntities) {
            List<UUID> productIDs = new ArrayList<>();
            orderEntity.getOrderProductsById().forEach(orderProductEntity -> {
                productIDs.add(orderProductEntity.getProductId());
            });

            List<ProductEntity> products = productRepository.findAllById(productIDs);
            List<ProductDTO> productDTOs = new ArrayList<>();
            products.forEach(productEntity -> {
                productDTOs.add(ProductMapper.MAPPER.fromEntityToDTO(productEntity));
            });

            OrderDTO orderDTO = OrderMapper.MAPPER.fromEntityToDTO(orderEntity);
            orderDTO.setProducts(productDTOs);

            orderDTOs.add(orderDTO);
        }
        return orderDTOs;
    }
}
