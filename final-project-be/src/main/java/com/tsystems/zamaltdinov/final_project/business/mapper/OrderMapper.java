package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper MAPPER = Mappers.getMapper(OrderMapper.class);

    OrderEntity fromDTOToEntity(OrderDTO orderDTO);
    OrderDTO fromEntityToDTO(OrderEntity orderEntity);
}
