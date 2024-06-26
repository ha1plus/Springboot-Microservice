package com.duongdh.ownerservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "owners")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Owner name cannot be null")
    private String ownerName;

    @NotNull(message = "Owner desc cannot be null")
    private String ownerDesc;

    @NotNull(message = "Owner code cannot be null")
    private String ownerCode;
}
