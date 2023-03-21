package com.tsystems.zamaltdinov.final_project.transactional.repository;

import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {
}
