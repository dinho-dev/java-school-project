package com.tsystems.zamaltdinov.final_project.business.service.impl;


import com.tsystems.zamaltdinov.final_project.business.mapper.ClientMapper;
import com.tsystems.zamaltdinov.final_project.business.service.ClientService;
import com.tsystems.zamaltdinov.final_project.business.dto.ClientDTO;
import com.tsystems.zamaltdinov.final_project.transactional.entity.ClientEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository repository;
   /* @PersistenceContext
    private EntityManager entityManager;*/

    public ClientServiceImpl(ClientRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<ClientDTO> findById(UUID id) {
        /*entityManager.createNativeQuery()*/
        Optional<ClientEntity> clientEntity = repository.findById(id);
        return clientEntity.map(ClientMapper.MAPPER::fromEntityToDTO);
    }

    @Override
    public void deleteById(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<ClientDTO> update(UUID id, ClientDTO client) {

        Optional<ClientEntity> clientData = repository.findById(id);

        if (clientData.isPresent()) {
            ClientEntity clientEntity = ClientMapper.MAPPER.fromDTOToEntity(client);
            repository.save(clientEntity);
            return Optional.of(ClientMapper.MAPPER.fromEntityToDTO(clientEntity));
        } else {
            return Optional.empty();
        }

    }

    @Override
    public ClientDTO save(ClientDTO client) {
        ClientEntity clientEntity = ClientMapper.MAPPER.fromDTOToEntity(client);
        repository.save(clientEntity);
        return ClientMapper.MAPPER.fromEntityToDTO(clientEntity);
    }

    @Override
    public List<ClientDTO> findAllClients() {
        List<ClientEntity> clientEntityList = repository.findAll();
        List<ClientDTO> result = new ArrayList<>();
        for (ClientEntity client:clientEntityList) {
            result.add(ClientMapper.MAPPER.fromEntityToDTO(client));
        }
        return result;
    }
}

