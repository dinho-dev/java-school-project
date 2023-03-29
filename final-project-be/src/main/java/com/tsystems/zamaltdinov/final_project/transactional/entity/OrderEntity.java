package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "order", schema = "store", catalog = "postgres")
public class OrderEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "id")
    private UUID id;
    @Basic
    @Column(name = "client_id")
    private UUID clientId;
    @Basic
    @Column(name = "address_id")
    private UUID addressId;
    @Basic
    @Column(name = "payment_method", insertable=false, updatable=false)
    private String paymentMethod;
    @Basic
    @Column(name = "delivery_method", insertable=false, updatable=false)
    private String deliveryMethod;
    @Basic
    @Column(name = "payment_status", insertable=false, updatable=false)
    private String paymentStatus;
    @Basic
    @Column(name = "order_status", insertable=false, updatable=false)
    private String orderStatus;
    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id", insertable=false, updatable=false)
    private ClientEntity clientByClientId;
    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id", insertable=false, updatable=false)
    private AddressEntity addressByAddressId;
    @ManyToOne
    @JoinColumn(name = "payment_method", referencedColumnName = "id")
    private PaymentMethodEntity paymentMethodByPaymentMethod;
    @ManyToOne
    @JoinColumn(name = "delivery_method", referencedColumnName = "id")
    private DeliveryMethodEntity deliveryMethodByDeliveryMethod;
    @ManyToOne
    @JoinColumn(name = "payment_status", referencedColumnName = "id")
    private PaymentStatusEntity paymentStatusByPaymentStatus;
    @ManyToOne
    @JoinColumn(name = "order_status", referencedColumnName = "id")
    private OrderStatusEntity orderStatusByOrderStatus;
    @OneToMany(mappedBy = "orderByOrderId")
    private Collection<OrderProductEntity> orderProductsById;

    public OrderEntity() {
    }

    public OrderEntity(UUID id, UUID clientId, UUID addressId, String paymentMethod, String deliveryMethod,
                       String paymentStatus, String orderStatus, ClientEntity clientByClientId,
                       AddressEntity addressByAddressId, PaymentMethodEntity paymentMethodByPaymentMethod,
                       DeliveryMethodEntity deliveryMethodByDeliveryMethod,
                       PaymentStatusEntity paymentStatusByPaymentStatus, OrderStatusEntity orderStatusByOrderStatus,
                       Collection<OrderProductEntity> orderProductsById) {
        this.id = id;
        this.clientId = clientId;
        this.addressId = addressId;
        this.paymentMethod = paymentMethod;
        this.deliveryMethod = deliveryMethod;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.clientByClientId = clientByClientId;
        this.addressByAddressId = addressByAddressId;
        this.paymentMethodByPaymentMethod = paymentMethodByPaymentMethod;
        this.deliveryMethodByDeliveryMethod = deliveryMethodByDeliveryMethod;
        this.paymentStatusByPaymentStatus = paymentStatusByPaymentStatus;
        this.orderStatusByOrderStatus = orderStatusByOrderStatus;
        this.orderProductsById = orderProductsById;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderEntity that = (OrderEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (clientId != null ? !clientId.equals(that.clientId) : that.clientId != null) return false;
        if (addressId != null ? !addressId.equals(that.addressId) : that.addressId != null) return false;
        if (paymentMethod != null ? !paymentMethod.equals(that.paymentMethod) : that.paymentMethod != null)
            return false;
        if (deliveryMethod != null ? !deliveryMethod.equals(that.deliveryMethod) : that.deliveryMethod != null)
            return false;
        if (paymentStatus != null ? !paymentStatus.equals(that.paymentStatus) : that.paymentStatus != null)
            return false;
        if (orderStatus != null ? !orderStatus.equals(that.orderStatus) : that.orderStatus != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (clientId != null ? clientId.hashCode() : 0);
        result = 31 * result + (addressId != null ? addressId.hashCode() : 0);
        result = 31 * result + (paymentMethod != null ? paymentMethod.hashCode() : 0);
        result = 31 * result + (deliveryMethod != null ? deliveryMethod.hashCode() : 0);
        result = 31 * result + (paymentStatus != null ? paymentStatus.hashCode() : 0);
        result = 31 * result + (orderStatus != null ? orderStatus.hashCode() : 0);
        return result;
    }

    public ClientEntity getClientByClientId() {
        return clientByClientId;
    }

    public void setClientByClientId(ClientEntity clientByClientId) {
        this.clientByClientId = clientByClientId;
    }

    public AddressEntity getAddressByAddressId() {
        return addressByAddressId;
    }

    public void setAddressByAddressId(AddressEntity addressByAddressId) {
        this.addressByAddressId = addressByAddressId;
    }

    public PaymentMethodEntity getPaymentMethodByPaymentMethod() {
        return paymentMethodByPaymentMethod;
    }

    public void setPaymentMethodByPaymentMethod(PaymentMethodEntity paymentMethodByPaymentMethod) {
        this.paymentMethodByPaymentMethod = paymentMethodByPaymentMethod;
    }

    public DeliveryMethodEntity getDeliveryMethodByDeliveryMethod() {
        return deliveryMethodByDeliveryMethod;
    }

    public void setDeliveryMethodByDeliveryMethod(DeliveryMethodEntity deliveryMethodByDeliveryMethod) {
        this.deliveryMethodByDeliveryMethod = deliveryMethodByDeliveryMethod;
    }

    public PaymentStatusEntity getPaymentStatusByPaymentStatus() {
        return paymentStatusByPaymentStatus;
    }

    public void setPaymentStatusByPaymentStatus(PaymentStatusEntity paymentStatusByPaymentStatus) {
        this.paymentStatusByPaymentStatus = paymentStatusByPaymentStatus;
    }

    public OrderStatusEntity getOrderStatusByOrderStatus() {
        return orderStatusByOrderStatus;
    }

    public void setOrderStatusByOrderStatus(OrderStatusEntity orderStatusByOrderStatus) {
        this.orderStatusByOrderStatus = orderStatusByOrderStatus;
    }

    public Collection<OrderProductEntity> getOrderProductsById() {
        return orderProductsById;
    }

    public void setOrderProductsById(Collection<OrderProductEntity> orderProductsById) {
        this.orderProductsById = orderProductsById;
    }
}
