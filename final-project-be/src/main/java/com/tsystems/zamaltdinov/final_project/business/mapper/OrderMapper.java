package com.tsystems.zamaltdinov.final_project.business.mapper;

import com.tsystems.zamaltdinov.final_project.business.dto.OrderDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper MAPPER = Mappers.getMapper(OrderMapper.class);

    default OrderEntity fromDTOToEntity(OrderDTO orderDTO) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(orderDTO.getId());
        orderEntity.setOrderStatus(orderDTO.getOrderStatus());
        return orderEntity;
    }

    default OrderDTO fromEntityToDTO(OrderEntity orderEntity) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(orderEntity.getId());
        orderDTO.setOrderStatus(orderEntity.getOrderStatus());
        return orderDTO;
    }
}
