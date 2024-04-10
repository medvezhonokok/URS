package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.model.Task;
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

    @PostMapping("/all_by_user_id")
    public ResponseEntity<List<Task>> getAllTasks(@RequestBody Map<String, Object> requestBody) {
        String jwt = (String) requestBody.get("jwt");

        if (StringUtil.isNotNullOrEmpty(jwt)) {
            User user = jwtService.findUserByJWT(jwt);

            if (user != null) {
                return new ResponseEntity<>(taskService.findAllByUserId(user.getId()), HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/mark_as_done")
    public ResponseEntity<String> markAsDone(@RequestBody Map<String, Object> requestBody) {
        String jwt = (String) requestBody.get("jwt");
        Long taskId = Long.parseLong(String.valueOf(requestBody.get("taskId")));

        if (StringUtil.isNotNullOrEmpty(jwt)) {
            User user = jwtService.findUserByJWT(jwt);

            if (user != null) {
                taskService.updateTaskStatusByTaskId(taskId, "DONE");
                return new ResponseEntity<>("OK", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTask(@RequestBody Map<String, Object> requestBody) {
        String jwt = (String) requestBody.get("jwt");
        String content = (String) requestBody.get("content");
        Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        String deadlineString = (String) requestBody.get("deadline");

        long companyId;
        try {
            companyId = Long.parseLong(String.valueOf(requestBody.get("companyId")));
        } catch (Exception ignored) {
            return new ResponseEntity<>("Parameter `companyId` isn't correct.", HttpStatus.BAD_REQUEST);
        }

        if (StringUtil.isNotNullOrEmpty(jwt) && StringUtil.isNotNullOrEmpty(content) && StringUtil.isNotNullOrEmpty(deadlineString)) {
            User taskAuthor = jwtService.findUserByJWT(jwt);
            User taskExecutor = userService.findById(userId);

            if (taskAuthor != null && taskAuthor.getUserRole() == UserRole.CEO && taskExecutor != null) {
                Task task = new Task();

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

                task.setStatus("TODO");
                task.setUser(taskAuthor);
                task.setContent(content);
                task.setCompany(companyService.findById(companyId));
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

    @PostMapping("/assign_to_user")
    public void assignTaskToUser(@RequestBody Map<String, Object> requestBody) {
        String jwt = (String) requestBody.get("jwt");
        Long taskId = Long.parseLong(String.valueOf(requestBody.get("taskId")));
        Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));

        if (StringUtil.isNotNullOrEmpty(jwt)) {
            User user = jwtService.findUserByJWT(jwt);
            Task task = taskService.findById(taskId);
            User executor = userService.findById(userId);

            if (user != null && task != null && executor != null) {
                taskService.updateUserAndStatusById(taskId, executor.getId(), "IN_PROCESS");
            }
        }
    }
}
