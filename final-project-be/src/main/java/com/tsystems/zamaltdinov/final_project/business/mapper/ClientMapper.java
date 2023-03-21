package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.ClientDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ClientEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ClientMapper {
    ClientMapper MAPPER = Mappers.getMapper(ClientMapper.class);
    ClientEntity fromDTOToEntity(ClientDTO clientDTO);
    ClientDTO fromEntityToDTO(ClientEntity clientEntity);
}
