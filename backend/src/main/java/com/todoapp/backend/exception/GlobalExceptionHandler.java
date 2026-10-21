package com.todoapp.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, Object>> handleValidationErrors(
                        MethodArgumentNotValidException ex) {

                Map<String, String> errors = new LinkedHashMap<>();

                ex.getBindingResult().getFieldErrors().forEach(error -> errors.putIfAbsent(
                                error.getField(),
                                error.getDefaultMessage()));

                Map<String, Object> response = Map.of(
                                "status", 400,
                                "message", "Error de validación",
                                "errors", errors);

                return ResponseEntity
                                .badRequest()
                                .body(response);
        }

        @ExceptionHandler(InvalidCredentialsException.class)
        public ResponseEntity<Map<String, Object>> handleInvalidCredentials(
                        InvalidCredentialsException ex) {

                System.out.println(">>> GlobalExceptionHandler ejecutado: " + ex.getMessage());

                return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of(
                                                "status", 401,
                                                "message", ex.getMessage()));
        }
}