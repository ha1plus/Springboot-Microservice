package com.duongdh.ownerservice.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OwnerDto {
    private Long id;

    //Owner name should not be null or empty
    @NotEmpty(message = "Owner name should not be null or empty")
    private String ownerName;

    //Owner desc should not be null or empty
    @NotEmpty(message = "Owner desc should not be null or empty")
    private String ownerDesc;

    //Owner code should not be null or empty
    @NotEmpty(message = "Owner code should not be null or empty")
    private String ownerCode;
}
