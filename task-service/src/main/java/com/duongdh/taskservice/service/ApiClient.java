package com.duongdh.taskservice.service;

import com.duongdh.taskservice.dto.OwnerDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "OWNER-SERVICE")
public interface ApiClient {
    // Build get Owner REST API
    @GetMapping("api/owners/{owner-code}")
    OwnerDto getOwner (@PathVariable("owner-code") String ownerCode);
}
