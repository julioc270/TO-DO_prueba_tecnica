package com.todoapp.backend.dto;

public record UserResponse(
        Long id,
        String name,
        String lastName,
        String email) {
}