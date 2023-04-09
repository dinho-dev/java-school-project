package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.AddressDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.ProductDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AddressService {
    Optional<AddressDTO> findById(UUID id);
    void deleteById(UUID id);

    Optional<AddressDTO> update(UUID id, AddressDTO addressDTO);

    AddressDTO save(AddressDTO addressDTO);

    List<AddressDTO> findAllAddresses();

}