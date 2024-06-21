package com.duongdh.taskservice.service;

import com.duongdh.taskservice.dto.ApiResponseDto;
import com.duongdh.taskservice.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto saveTask(TaskDto taskDto);
    ApiResponseDto getTaskById(Long taskId);
    List<TaskDto> getAllTasks();
    TaskDto updateTask(Long taskId, TaskDto taskDto);
    void deleteTask(Long taskId);
}
