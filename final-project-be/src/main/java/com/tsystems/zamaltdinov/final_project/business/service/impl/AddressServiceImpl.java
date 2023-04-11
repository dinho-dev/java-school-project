package com.tsystems.zamaltdinov.final_project.business.service.impl;


import com.tsystems.zamaltdinov.final_project.business.dto.AddressDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.CategoryDTO;
import com.tsystems.zamaltdinov.final_project.business.mapper.AddressMapper;
import com.tsystems.zamaltdinov.final_project.business.mapper.CategoryMapper;
import com.tsystems.zamaltdinov.final_project.business.service.AddressService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.AddressEntity;
import com.tsystems.zamaltdinov.final_project.transactional.entity.CategoryEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AddressServiceImpl implements AddressService {
    private final AddressRepository repository;

    public AddressServiceImpl(AddressRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<AddressDTO> findById(UUID id) {
        Optional<AddressEntity> addressEntity = repository.findById(id);
        return addressEntity.map(AddressMapper.MAPPER::fromEntityToDTO);
    }

    @Override
    public void deleteById(UUID id) {
        repository.deleteById(id);
    }


    @Override
    public Optional<AddressDTO> update(UUID id, AddressDTO addressDTO) {
        Optional<AddressEntity> addressData = repository.findById(id);
        if (addressData.isPresent()) {
            AddressEntity addressEntity = AddressMapper.MAPPER.fromDTOToEntity(addressDTO);
            repository.save(addressEntity);
            return Optional.of(AddressMapper.MAPPER.fromEntityToDTO(addressEntity));
        } else {
            return Optional.empty();
        }

    }

    @Override
    public AddressDTO save(AddressDTO addressDTO) {
        AddressEntity addressEntity = AddressMapper.MAPPER.fromDTOToEntity(addressDTO);
        repository.save(addressEntity);
        return AddressMapper.MAPPER.fromEntityToDTO(addressEntity);
    }


    @Override
    public List<AddressDTO> findAllAddresses() {
        List<AddressEntity> addressEntityList = repository.findAll();
        List<AddressDTO> result = new ArrayList<>();
        for (AddressEntity address:addressEntityList) {
            result.add(AddressMapper.MAPPER.fromEntityToDTO(address));
        }
        return result;
    }


    @Override
    public Optional<AddressDTO> findByUserId(UUID userId) {
        Optional<AddressEntity> addressEntity = repository.findByUserId(userId);
        return addressEntity.map(AddressMapper.MAPPER::fromEntityToDTO);
    }

}

/*
    @Override
    public Optional<CategoryDTO> findById(Integer id) {
        Optional<CategoryEntity> categoryEntity = repository.findById(id);
        return categoryEntity.map(CategoryMapper.MAPPER::fromEntityToDTO);
    }*/
