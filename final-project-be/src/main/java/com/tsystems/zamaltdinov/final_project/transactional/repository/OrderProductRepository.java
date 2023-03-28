package com.tsystems.zamaltdinov.final_project.transactional.repository;

import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderProductRepository extends JpaRepository<OrderProductEntity, UUID> {
}
