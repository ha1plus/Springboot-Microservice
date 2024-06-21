package com.duongdh.ownerservice.controller;

import com.duongdh.ownerservice.dto.OwnerDto;
import com.duongdh.ownerservice.service.OwnerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/owners")
@AllArgsConstructor
public class OwnerController {
    private OwnerService ownerService;

    // Build save Owner REST API
    @PostMapping
    public ResponseEntity<OwnerDto> saveOwner (@Valid @RequestBody OwnerDto ownerDto){
        OwnerDto saveOwner = ownerService.saveOwner(ownerDto);
        return new ResponseEntity<>(saveOwner, HttpStatus.CREATED);
    }

    // Build get Owner REST API
    @GetMapping("{owner-code}")
    public ResponseEntity<OwnerDto> getOwner (@PathVariable("owner-code") String ownerCode){
        OwnerDto ownerDto = ownerService.getOwnerByCode(ownerCode);
        return new ResponseEntity<>(ownerDto, HttpStatus.OK);
    }

    // Build get all Owner REST API
    @GetMapping()
    public ResponseEntity<List<OwnerDto>> getAllOwners (){
        List<OwnerDto> ownerDtos = ownerService.getAllOwners();
        return new ResponseEntity<>(ownerDtos, HttpStatus.OK);
    }

    // Build update Owner REST API
    @PutMapping("{id}")
    public ResponseEntity<OwnerDto> updateOwner(@PathVariable("id") Long ownerId,
                                                @Valid @RequestBody OwnerDto ownerDto){
        OwnerDto updateOwner = ownerService.updateOwner(ownerId, ownerDto);
        return new ResponseEntity<>(updateOwner, HttpStatus.OK);
    }

    // Build delete Owner REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOwner(@PathVariable("id") Long ownerId){
        ownerService.deleteOwner(ownerId);
        return new ResponseEntity<>("Owner successfully deleted!", HttpStatus.OK);
    }
}
