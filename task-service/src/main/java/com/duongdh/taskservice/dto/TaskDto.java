package com.duongdh.taskservice.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;

    @NotEmpty(message = "Task name should not be null or empty")
    private String taskName;

    private String ownerCode;
}
