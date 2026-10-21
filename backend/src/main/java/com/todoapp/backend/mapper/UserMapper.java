package com.todoapp.backend.mapper;

import com.todoapp.backend.dto.UserResponse;
import com.todoapp.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getLastName(),
                user.getEmail());
    }
}