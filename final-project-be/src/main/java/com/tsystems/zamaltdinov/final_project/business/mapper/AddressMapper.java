package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.AddressDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.AddressEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AddressMapper {
    AddressMapper MAPPER = Mappers.getMapper(AddressMapper.class);
    AddressEntity fromDTOToEntity(AddressDTO addressDTO);
    AddressDTO fromEntityToDTO(AddressEntity addressEntity);
}

