package com.duongdh.taskservice.service.impl;

import com.duongdh.taskservice.dto.ApiResponseDto;
import com.duongdh.taskservice.dto.OwnerDto;
import com.duongdh.taskservice.dto.TaskDto;
import com.duongdh.taskservice.entity.Task;
import com.duongdh.taskservice.exception.ResourceNotFoundException;
import com.duongdh.taskservice.repository.TaskRepository;
import com.duongdh.taskservice.service.ApiClient;
import com.duongdh.taskservice.service.TaskService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    private ModelMapper modelMapper;
    private ApiClient apiClient;

    @Override
    public TaskDto saveTask(TaskDto taskDto) {
        Task task = modelMapper.map(taskDto, Task.class);
        Task saveTask = taskRepository.save(task);
        TaskDto saveTaskDto = modelMapper.map(saveTask, TaskDto.class);
        return saveTaskDto;
    }

    @Override
    public ApiResponseDto getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task is not exist with given id: " + taskId));
        OwnerDto ownerDto = apiClient.getOwner(task.getOwnerCode());
        TaskDto taskDto = modelMapper.map(task, TaskDto.class);

        ApiResponseDto apiResponseDto = new ApiResponseDto();
        apiResponseDto.setId(taskDto.getId());
        apiResponseDto.setTaskName(taskDto.getTaskName());
        apiResponseDto.setOwnerDto(ownerDto.getOwnerName());
        return apiResponseDto;
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map((task) -> modelMapper.map(task, TaskDto.class)).collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto taskDto) {
        Task existTask = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task is not exist with given id: " + taskId));
        existTask.setTaskName(taskDto.getTaskName());
        existTask.setOwnerCode(taskDto.getOwnerCode());
        Task updateTask = taskRepository.save(existTask);
        TaskDto updateOwnerDto = modelMapper.map(updateTask, TaskDto.class);
        return updateOwnerDto;
    }

    @Override
    public void deleteTask(Long taskId) {
        Task exsitTask = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task is not exist with given id: " + taskId));
        taskRepository.deleteById(taskId);
    }
}
