package com.tsystems.zamaltdinov.final_project.rest.controller;

import com.tsystems.zamaltdinov.final_project.business.dto.AddressDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.CategoryDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.UserDTO;
import com.tsystems.zamaltdinov.final_project.business.service.AddressService;
import com.tsystems.zamaltdinov.final_project.transactional.entity.AddressEntity;
import com.tsystems.zamaltdinov.final_project.transactional.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/address")
public class AddressController {
    @Autowired
    AddressService addressService;

    @GetMapping
    public List<AddressDTO> findAllAddresses() {
        return addressService.findAllAddresses();
    }
    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable("id") UUID id) {
        Optional<AddressDTO> addressData = addressService.findById(id);

        if (addressData.isPresent()) {
            return new ResponseEntity<>(addressData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<AddressDTO> createAddress(@RequestBody AddressDTO addressDTO) {
        try {
            AddressDTO _address = addressService.save(addressDTO);
            return new ResponseEntity<>(_address, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable("id") UUID id, @RequestBody AddressDTO addressDTO) {
        addressDTO.setId(id);
        Optional<AddressDTO> addressData = addressService.update(id, addressDTO);

        if (addressData.isPresent()) {
            return new ResponseEntity<>(addressData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteAddress(@PathVariable("id") UUID id) {
        try {
            addressService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  @GetMapping("/user/{id}")
  public ResponseEntity<AddressDTO> getAddressByUserId(@PathVariable("id") UUID userId) {
      Optional<AddressDTO> addressData = addressService.findByUserId(userId);

      if (addressData.isPresent()) {
          return new ResponseEntity<>(addressData.get(), HttpStatus.OK);
      } else {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  }
}

