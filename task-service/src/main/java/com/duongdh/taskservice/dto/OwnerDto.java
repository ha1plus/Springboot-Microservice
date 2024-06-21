package com.duongdh.taskservice.dto;

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
    private String ownerName;
    private String ownerDesc;
    private String ownerCode;
}
