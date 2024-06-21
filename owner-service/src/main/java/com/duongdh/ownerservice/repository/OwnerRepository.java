package com.duongdh.ownerservice.repository;

import com.duongdh.ownerservice.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
        Optional<Owner> findByOwnerCode(String ownerCode);
}
