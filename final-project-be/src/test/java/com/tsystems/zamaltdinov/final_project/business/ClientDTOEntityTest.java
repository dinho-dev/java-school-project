package com.tsystems.zamaltdinov.final_project.business;

import com.tsystems.zamaltdinov.final_project.transactional.entity.ClientEntity;
import org.junit.Ignore;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.UUID;

@Ignore
class ClientDTOEntityTest {
    @Test
    public void test() {
        ClientEntity client1 = new ClientEntity(UUID.fromString("aa5366f0-aa25-11ed-afa1-0242ac120002"), "John",
                "Doe", LocalDate.of(1990, 1, 1), "johndoe@email.com", "password123");
        System.out.printf("Client: " + client1.getName() + " " + client1.getSurname());
    }
}