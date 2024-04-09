package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.model.Task;
import ru.mkim.backend.model.TaskStatus;
import ru.mkim.backend.model.User;
import ru.mkim.backend.model.UserRole;
import ru.mkim.backend.service.CompanyService;
import ru.mkim.backend.service.JwtService;
import ru.mkim.backend.service.TaskService;
import ru.mkim.backend.service.UserService;
import ru.mkim.backend.util.StringUtil;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private final JwtService jwtService;
    private final UserService userService;
    private final TaskService taskService;
    private final CompanyService companyService;

    public TaskController(JwtService jwtService, UserService userService, TaskService taskService, CompanyService companyService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.taskService = taskService;
        this.companyService = companyService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTask(@RequestBody Map<String, Object> requestBody) {
        String jwt = (String) requestBody.get("jwt");
        String content = (String) requestBody.get("content");
        Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        String deadlineString = (String) requestBody.get("deadline");

        if (StringUtil.isNotNullOrEmpty(jwt) && StringUtil.isNotNullOrEmpty(content) && StringUtil.isNotNullOrEmpty(deadlineString)) {
            User taskAuthor = jwtService.findUserByJWT(jwt);
            User taskExecutor = userService.findById(userId);

            if (taskAuthor != null && taskAuthor.getUserRole() == UserRole.CEO && taskExecutor != null) {
                Task task = new Task();

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

                task.setStatus(TaskStatus.TODO);
                task.setUser(taskAuthor);
                task.setContent(content);
                task.setDeadline(LocalDateTime.parse(deadlineString, formatter));

                taskService.save(task);
                return new ResponseEntity<>("Task added successfully", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get_company_tasks")
    public ResponseEntity<List<Task>> getCompanyTaskByCompanyId(@RequestParam String jwt, @RequestParam Long companyId) {
        if (StringUtil.isNotNullOrEmpty(jwt) && companyId != null) {
            User user = jwtService.findUserByJWT(jwt);

            if (user != null && user.getUserRole() == UserRole.CEO) {
                return new ResponseEntity<>(companyService.getById(companyId).getTasks(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/take_on_task")
    public void takeOnTask(@RequestBody Map<String, Object> requestBody) {
        String jwt = (String) requestBody.get("jwt");
        Long taskId = Long.parseLong(String.valueOf(requestBody.get("taskId")));

        if (StringUtil.isNotNullOrEmpty(jwt)) {
            User user = jwtService.findUserByJWT(jwt);
            Task task = taskService.findById(taskId);

            if (user != null && task != null) {
                task.setUser(user);
                task.setStatus(TaskStatus.IN_PROCESS);
                taskService.update(task);
            }
        }
    }
}
