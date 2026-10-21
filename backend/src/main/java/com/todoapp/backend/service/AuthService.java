package com.todoapp.backend.service;

import com.todoapp.backend.dto.AuthResponse;
import com.todoapp.backend.dto.LoginRequest;
import com.todoapp.backend.dto.RegisterRequest;
import com.todoapp.backend.dto.UserResponse;
import com.todoapp.backend.entity.User;
import com.todoapp.backend.exception.InvalidCredentialsException;
import com.todoapp.backend.mapper.UserMapper;
import com.todoapp.backend.repository.UserRepository;
import com.todoapp.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public AuthResponse register(RegisterRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El correo ya está registrado");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));

        User savedUser = userRepository.save(user);

        return createAuthResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword())) {

            throw new InvalidCredentialsException();
        }
        return createAuthResponse(user);
    }

    private AuthResponse createAuthResponse(User user) {

        UserResponse userResponse = userMapper.toResponse(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                "Bearer",
                userResponse);
    }
}