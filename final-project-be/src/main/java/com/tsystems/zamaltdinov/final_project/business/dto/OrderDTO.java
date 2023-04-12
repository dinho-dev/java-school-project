package com.tsystems.zamaltdinov.final_project.business.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OrderDTO implements Serializable {
    private UUID id;
    private UUID clientId;
    private UUID addressId;
    private String paymentMethod;
    private String deliveryMethod;
    private String paymentStatus;
    private String orderStatus;
    private Date orderDate;

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

    private List<ProductDTO> products;

    public OrderDTO() {
    }

    public OrderDTO(UUID id, UUID clientId, UUID addressId, String paymentMethod, String deliveryMethod,
                    String paymentStatus, String orderStatus, Date orderDate, List<ProductDTO> products) {
        this.id = id;
        this.clientId = clientId;
        this.addressId = addressId;
        this.paymentMethod = paymentMethod;
        this.deliveryMethod = deliveryMethod;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getClientId() {
        return clientId;
    }

    public void setClientId(UUID clientId) {
        this.clientId = clientId;
    }

    public UUID getAddressId() {
        return addressId;
    }

    public void setAddressId(UUID addressId) {
        this.addressId = addressId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
}

