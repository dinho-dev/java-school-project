package com.tsystems.zamaltdinov.final_project.rest.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.tsystems.zamaltdinov.final_project.business.service.ClientService;
import com.tsystems.zamaltdinov.final_project.business.dto.ClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5432")
@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {
    @Autowired
    ClientService clientService;

    @GetMapping
    public List<ClientDTO> findAllClients() {
        return clientService.findAllClients();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable("id") UUID id) {
        Optional<ClientDTO> clientData = clientService.findById(id);

        if (clientData.isPresent()) {
            return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<ClientDTO> createClient(@RequestBody ClientDTO client) {
        try {
            ClientDTO _client = clientService.save(client);
            return new ResponseEntity<>(_client, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable("id") UUID id, @RequestBody ClientDTO client) {
        Optional<ClientDTO> clientData = clientService.update(id, client);

        if (clientData.isPresent()) {
            return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteClient(@PathVariable("id") UUID id) {
        try {
            clientService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
