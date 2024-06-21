package com.duongdh.taskservice.repository;

import com.duongdh.taskservice.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
