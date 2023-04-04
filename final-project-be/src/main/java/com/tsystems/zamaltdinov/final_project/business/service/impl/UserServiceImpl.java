package com.tsystems.zamaltdinov.final_project.business.service.impl;


import com.tsystems.zamaltdinov.final_project.business.dto.UserDTO;
import com.tsystems.zamaltdinov.final_project.business.mapper.UserMapper;
import com.tsystems.zamaltdinov.final_project.business.service.UserService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.User;
import com.tsystems.zamaltdinov.final_project.transactional.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<UserDTO> findById(UUID id) {
        /*entityManager.createNativeQuery()*/
        Optional<User> user = repository.findById(id);
        return user.map(UserMapper.MAPPER::fromEntityToDTO);
    }

    @Override
    public void deleteById(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<UserDTO> update(UUID id, UserDTO user) {

        Optional<User> userData = repository.findById(id);

        if (userData.isPresent()) {
            User user_ = UserMapper.MAPPER.fromDTOToEntity(user);
            repository.save(user_);
            return Optional.of(UserMapper.MAPPER.fromEntityToDTO(user_));
        } else {
            return Optional.empty();
        }

    }

    @Override
    public UserDTO save(UserDTO user) {
        User user_ = UserMapper.MAPPER.fromDTOToEntity(user);
        repository.save(user_);
        return UserMapper.MAPPER.fromEntityToDTO(user_);
    }

    @Override
    public List<UserDTO> findAllUsers() {
        List<User> userList = repository.findAll();
        List<UserDTO> result = new ArrayList<>();
        for (User user:userList) {
            result.add(UserMapper.MAPPER.fromEntityToDTO(user));
        }
        return result;
    }
}

