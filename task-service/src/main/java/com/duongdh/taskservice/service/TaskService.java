package com.duongdh.taskservice.service;

import com.duongdh.taskservice.dto.ApiResponseDto;
import com.duongdh.taskservice.dto.TaskDto;
import com.duongdh.taskservice.entity.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    TaskDto saveTask(TaskDto taskDto);
    ApiResponseDto getTaskById(Long taskId);
    List<TaskDto> getAllTasks();
    TaskDto updateTask(Long taskId, TaskDto taskDto);
    void deleteTask(Long taskId);
}
