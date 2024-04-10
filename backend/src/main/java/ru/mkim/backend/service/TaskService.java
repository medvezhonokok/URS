package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.model.Task;
import ru.mkim.backend.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public void save(Task t) {
        taskRepository.save(t);
    }

    public Task findById(Long taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    public void updateUserAndStatusById(Long taskId, long userId, String taskStatus) {
        taskRepository.updateUserAndStatusById(taskId, userId, taskStatus);
    }

    public List<Task> findAllByUserId(Long userId) {
        return taskRepository.findAllByUserId(userId);
    }

    public void updateTaskStatusByTaskId(Long taskId, String status) {
        taskRepository.updateStatusById(taskId, status);
    }
}
