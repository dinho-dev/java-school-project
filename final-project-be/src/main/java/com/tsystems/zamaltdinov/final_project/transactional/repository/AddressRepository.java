package com.tsystems.zamaltdinov.final_project.transactional.repository;

import com.tsystems.zamaltdinov.final_project.transactional.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressRepository extends JpaRepository<AddressEntity, UUID> {
}
