package com.tsystems.zamaltdinov.final_project.business.dto;

import java.io.Serializable;
import java.util.UUID;

public class OrderDTO implements Serializable {
    private UUID id;
    private UUID clientId;
    private UUID addressId;
    private String paymentMethod;
    private String deliveryMethod;
    private String paymentStatus;
    private String orderStatus;

    public OrderDTO() {
    }

    public OrderDTO(UUID id, UUID clientId, UUID addressId, String paymentMethod, String deliveryMethod,
                    String paymentStatus, String orderStatus) {
        this.id = id;
        this.clientId = clientId;
        this.addressId = addressId;
        this.paymentMethod = paymentMethod;
        this.deliveryMethod = deliveryMethod;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
    }
}

