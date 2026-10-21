package com.todoapp.backend.dto;

public record AuthResponse(
        String token,
        String tokenType,
        UserResponse user) {
}