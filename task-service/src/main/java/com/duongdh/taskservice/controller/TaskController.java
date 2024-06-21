package com.duongdh.taskservice.controller;

import com.duongdh.taskservice.dto.ApiResponseDto;
import com.duongdh.taskservice.dto.TaskDto;
import com.duongdh.taskservice.service.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;

    // Build save Task REST API
    @PostMapping
    public ResponseEntity<TaskDto> saveTask (@Valid @RequestBody TaskDto taskDto){
        TaskDto saveOwner = taskService.saveTask(taskDto);
        return new ResponseEntity<>(saveOwner, HttpStatus.CREATED);
    }

    // Build get Task REST API
    @GetMapping("{id}")
    public ResponseEntity<ApiResponseDto> getOwner (@PathVariable("id") Long taskId){
        ApiResponseDto apiResponseDto = taskService.getTaskById(taskId);
        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }

    // Build get all Task REST API
    @GetMapping()
    public ResponseEntity<List<TaskDto>> getAllTasks (){
        List<TaskDto> taskDtos = taskService.getAllTasks();
        return new ResponseEntity<>(taskDtos, HttpStatus.OK);
    }

    // Build update Task REST API
    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId,
                                                @Valid @RequestBody TaskDto taskDto){
        TaskDto updateTask = taskService.updateTask(taskId, taskDto);
        return new ResponseEntity<>(updateTask, HttpStatus.OK);
    }

    // Build delete Task REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOwner(@PathVariable("id") Long taskId){
        taskService.deleteTask(taskId);
        return new ResponseEntity<>("Task successfully deleted!", HttpStatus.OK);
    }
}
