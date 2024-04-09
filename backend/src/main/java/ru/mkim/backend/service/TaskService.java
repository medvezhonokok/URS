package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.model.Task;
import ru.mkim.backend.repository.TaskRepository;

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

    public void update(Task task) {
        taskRepository.update(task.getId(), task.getUser().getId(), task.getStatus());
    }
}
