package com.duongdh.ownerservice.repository;

import com.duongdh.ownerservice.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
        Optional<Owner> findByOwnerCode(String ownerCode);
}
