package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "client", schema = "store", catalog = "postgres")
public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    @Column(name = "email_address")
    private String emailAddress;
    @Column(name = "password")
    private String password;
    @OneToMany(mappedBy = "clientByClientId")
    private Collection<AddressEntity> addressesById;
    @OneToMany(mappedBy = "clientByClientId")
    private Collection<OrderEntity> ordersById;
    public ClientEntity() {}

    public ClientEntity(UUID id, String name, String surname, LocalDate dateOfBirth, String emailAddress, String password)
    {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.emailAddress = emailAddress;
        this.password = password;
    }
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() { return surname; }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "Client [id=" + id + ", name=" + name + ", surname=" + surname + ", date_of_birth=" + dateOfBirth +
                "email_address=" + emailAddress + "password=" + password + "]";
    }

    public Collection<AddressEntity> getAddressesById() {
        return addressesById;
    }

    public void setAddressesById(Collection<AddressEntity> addressesById) {
        this.addressesById = addressesById;
    }

    public Collection<OrderEntity> getOrdersById() {
        return ordersById;
    }

    public void setOrdersById(Collection<OrderEntity> ordersById) {
        this.ordersById = ordersById;
    }
}
