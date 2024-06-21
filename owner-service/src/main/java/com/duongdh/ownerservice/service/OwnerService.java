package com.duongdh.ownerservice.service;

import com.duongdh.ownerservice.dto.OwnerDto;

import java.util.List;

public interface OwnerService {
    OwnerDto saveOwner(OwnerDto ownerDto);
    OwnerDto getOwnerByCode(String code);
    List<OwnerDto> getAllOwners();
    OwnerDto updateOwner(Long ownerId, OwnerDto ownerDto);
    void deleteOwner(Long ownerId);
}
