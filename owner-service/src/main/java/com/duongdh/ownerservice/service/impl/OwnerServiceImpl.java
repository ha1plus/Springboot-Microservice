package com.duongdh.ownerservice.service.impl;

import com.duongdh.ownerservice.dto.OwnerDto;
import com.duongdh.ownerservice.entity.Owner;
import com.duongdh.ownerservice.exception.ResourceNotFoundException;
import com.duongdh.ownerservice.repository.OwnerRepository;
import com.duongdh.ownerservice.service.OwnerService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OwnerServiceImpl implements OwnerService {
    private OwnerRepository ownerRepository;
    private ModelMapper modelMapper;
    @Override
    public OwnerDto saveOwner(OwnerDto ownerDto) {
        Owner owner = modelMapper.map(ownerDto, Owner.class);
        Owner saveOwner = ownerRepository.save(owner);
        OwnerDto saveOwnerDto = modelMapper.map(saveOwner, OwnerDto.class);
        return saveOwnerDto;
    }

    @Override
    public OwnerDto getOwnerByCode(String ownerCode) {
        Owner owner = ownerRepository.findByOwnerCode(ownerCode).orElseThrow(() -> new ResourceNotFoundException("Owner is not exist with given code: " + ownerCode));
        OwnerDto ownerDto = modelMapper.map(owner, OwnerDto.class);
        return ownerDto;
    }

    @Override
    public List<OwnerDto> getAllOwners() {
        List<Owner> owners = ownerRepository.findAll();
        return owners.stream().map((owner) -> modelMapper.map(owner, OwnerDto.class)).collect(Collectors.toList());
    }

    @Override
    public OwnerDto updateOwner(Long ownerId, OwnerDto ownerDto) {
        Owner exsitOwner = ownerRepository.findById(ownerId).orElseThrow(() -> new ResourceNotFoundException("Owner is not exist with given id: " + ownerId));
        exsitOwner.setOwnerName(ownerDto.getOwnerName());
        exsitOwner.setOwnerDesc(ownerDto.getOwnerDesc());
        exsitOwner.setOwnerCode(ownerDto.getOwnerCode());
        Owner updateOwner = ownerRepository.save(exsitOwner);
        OwnerDto updateOwnerDto = modelMapper.map(updateOwner, OwnerDto.class);
        return updateOwnerDto;
    }

    @Override
    public void deleteOwner(Long ownerId) {
        Owner exsitOwner = ownerRepository.findById(ownerId).orElseThrow(() -> new ResourceNotFoundException("Owner is not exist with given id: " + ownerId));
        ownerRepository.deleteById(ownerId);
    }
}
