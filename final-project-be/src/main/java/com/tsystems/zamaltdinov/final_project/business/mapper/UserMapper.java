package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.UserDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);
    User fromDTOToEntity(UserDTO userDTO);
    UserDTO fromEntityToDTO(User clientEntity);
}
