package com.todoapp.backend.dto;

import com.todoapp.backend.enums.TaskPriority;
import com.todoapp.backend.enums.TaskStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UpdateTaskRequest(

        @NotBlank(message = "El título es obligatorio") @Size(max = 150, message = "El título no puede superar 150 caracteres") String title,

        @Size(max = 1000, message = "La descripción no puede superar 1000 caracteres") String description,

        LocalDate dueDate,

        @NotNull(message = "La prioridad es obligatoria") TaskPriority priority,

        @NotNull(message = "El estado es obligatorio") TaskStatus status) {
}