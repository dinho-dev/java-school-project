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
@ToString

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
    @Column(name = "payment_method")
    private String paymentMethod;
    @Basic
    @Column(name = "delivery_method")
    private String deliveryMethod;
    @Basic
    @Column(name = "payment_status")
    private String paymentStatus;
    @Basic
    @Column(name = "order_status")
    private String orderStatus;
    @Basic
    @Column(name = "order_date")
    private Date orderDate;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable=false, updatable=false)
    private User userByUserId;
    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id", insertable=false, updatable=false)
    private AddressEntity addressByAddressId;
    @ManyToOne
    @JoinColumn(name = "payment_method", referencedColumnName = "id", insertable=false, updatable=false)
    private PaymentMethodEntity paymentMethodByPaymentMethod;
    @ManyToOne
    @JoinColumn(name = "delivery_method", referencedColumnName = "id", insertable=false, updatable=false)
    private DeliveryMethodEntity deliveryMethodByDeliveryMethod;
    @ManyToOne
    @JoinColumn(name = "payment_status", referencedColumnName = "id", insertable=false, updatable=false)
    private PaymentStatusEntity paymentStatusByPaymentStatus;
    @ManyToOne
    @JoinColumn(name = "order_status", referencedColumnName = "id", insertable=false, updatable=false)
    private OrderStatusEntity orderStatusByOrderStatus;
    @OneToMany(mappedBy = "orderByOrderId")
    private Collection<OrderProductEntity> orderProductsById;

}
