package com.todoapp.backend.mapper;

import com.todoapp.backend.dto.TaskResponse;
import com.todoapp.backend.entity.Task;

import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskResponse toResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStartDate(),
                task.getDueDate(),
                task.getStatus(),
                task.getPriority());
    }
}