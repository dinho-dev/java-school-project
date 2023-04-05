package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "address", schema = "store", catalog = "postgres")
public class AddressEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private UUID id;
    @Basic
    @Column(name = "user_id")
    private UUID userId;
    @Basic
    @Column(name = "country")
    private String country;
    @Basic
    @Column(name = "city")
    private String city;
    @Basic
    @Column(name = "postal_code")
    private Integer postalCode;
    @Basic
    @Column(name = "street")
    private String street;
    @Basic
    @Column(name = "home")
    private Integer home;
    @Basic
    @Column(name = "apartment")
    private String apartment;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable=false, updatable=false)
    private User userByUserId;
    @OneToMany(mappedBy = "addressByAddressId")
    private Collection<OrderEntity> ordersById;


    public User getUserByUserId() {
        return userByUserId;
    }

    public void setUserbyUserId (User userByUserId) {
        this.userByUserId = userByUserId;
    }

    public Collection<OrderEntity> getOrdersById() {
        return ordersById;
    }

    public void setOrdersById(Collection<OrderEntity> ordersById) {
        this.ordersById = ordersById;
    }
}
