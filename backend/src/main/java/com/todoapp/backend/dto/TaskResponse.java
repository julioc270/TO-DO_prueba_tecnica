package com.todoapp.backend.dto;

import com.todoapp.backend.enums.TaskPriority;
import com.todoapp.backend.enums.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        LocalDateTime startDate,
        LocalDate dueDate,
        TaskStatus status,
        TaskPriority priority) {
}