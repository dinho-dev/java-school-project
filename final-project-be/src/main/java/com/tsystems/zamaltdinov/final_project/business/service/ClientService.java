package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.ClientDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientService {
    Optional<ClientDTO> findById(UUID id);

    void deleteById(UUID id);

    Optional<ClientDTO> update(UUID id, ClientDTO client);


    ClientDTO save(ClientDTO client);

    List<ClientDTO> findAllClients();

}
