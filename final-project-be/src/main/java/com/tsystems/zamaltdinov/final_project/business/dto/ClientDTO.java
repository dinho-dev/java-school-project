package com.tsystems.zamaltdinov.final_project.business.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

public class ClientDTO implements Serializable {
        private UUID id;
        private String name;
        private String surname;
        private LocalDate dateOfBirth;
        private String emailAddress;
        private String password;

        public ClientDTO() {
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

        public String getSurname() {
                return surname;
        }

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
}

