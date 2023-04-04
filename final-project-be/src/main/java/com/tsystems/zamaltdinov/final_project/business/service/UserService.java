package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.UserDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<UserDTO> findById(UUID id);

    void deleteById(UUID id);

    Optional<UserDTO> update(UUID id, UserDTO client);


    UserDTO save(UserDTO client);

    List<UserDTO> findAllUsers();

}
