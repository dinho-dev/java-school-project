package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order", schema = "store", catalog = "postgres")
public class OrderEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "id")
    private UUID id;
    @Basic
    @Column(name = "user_id")
    private UUID userId;
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
    @Basic
    @Column(name = "order_date", insertable=false, updatable=false)
    private Date orderDate;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable=false, updatable=false)
    private User userByUserId;
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



    public User getUserByUserId() {
        return userByUserId;
    }

    public void setUserByUserId(User userByUserId) {
        this.userByUserId = userByUserId;
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
