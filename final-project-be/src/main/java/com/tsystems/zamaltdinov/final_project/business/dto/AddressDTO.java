package com.tsystems.zamaltdinov.final_project.business.dto;

import com.tsystems.zamaltdinov.final_project.transactional.entity.OrderEntity;
import com.tsystems.zamaltdinov.final_project.transactional.entity.User;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;

public class AddressDTO implements Serializable {
    private UUID id;

    private String country;

    private String city;

    private Integer postalCode;

    private String street;

    private Integer home;

    private String apartment;

    public AddressDTO() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getHome() {
        return home;
    }

    public void setHome(Integer home) {
        this.home = home;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }
}
