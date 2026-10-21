package com.todoapp.backend.service;

import com.todoapp.backend.dto.CreateTaskRequest;
import com.todoapp.backend.dto.UpdateTaskRequest;
import com.todoapp.backend.dto.TaskResponse;
import com.todoapp.backend.entity.Task;
import com.todoapp.backend.entity.User;
import com.todoapp.backend.enums.TaskPriority;
import com.todoapp.backend.mapper.TaskMapper;
import com.todoapp.backend.repository.TaskRepository;
import com.todoapp.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    @Transactional
    public TaskResponse createTask(CreateTaskRequest request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Task task = new Task();

        task.setTitle(request.title().trim());
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setPriority(request.priority() != null
                ? request.priority()
                : TaskPriority.MEDIUM);
        task.setUser(user);

        Task savedTask = taskRepository.save(task);

        return taskMapper.toResponse(savedTask);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> getMyTasks(Long userId) {

        return taskRepository.findAllByUserId(userId)
                .stream()
                .map(taskMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long taskId, Long userId) {

        Task task = findOwnedTask(taskId, userId);

        return taskMapper.toResponse(task);
    }

    @Transactional
    public TaskResponse updateTask(
            Long taskId,
            UpdateTaskRequest request,
            Long userId) {

        Task task = findOwnedTask(taskId, userId);

        task.setTitle(request.title().trim());
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setPriority(request.priority());
        task.setStatus(request.status());

        return taskMapper.toResponse(task);
    }

    @Transactional
    public void deleteTask(Long taskId, Long userId) {

        Task task = findOwnedTask(taskId, userId);

        taskRepository.delete(task);
    }

    private Task findOwnedTask(Long taskId, Long userId) {

        return taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Tarea no encontrada"));
    }
}