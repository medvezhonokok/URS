package ru.mkim.backend.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.annotation.RequireJwtParam;
import ru.mkim.backend.exception.ValidationException;
import ru.mkim.backend.form.AuditCredentials;
import ru.mkim.backend.form.validator.AuditCredentialsValidator;
import ru.mkim.backend.model.Audit;
import ru.mkim.backend.service.AuditService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    private final AuditService auditService;

    private final AuditCredentialsValidator auditCredentialsValidator;

    public AuditController(AuditService auditService, AuditCredentialsValidator auditCredentialsValidator) {
        this.auditService = auditService;
        this.auditCredentialsValidator = auditCredentialsValidator;
    }

    @InitBinder("auditCredentials")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(auditCredentialsValidator);
    }

    @RequireJwtParam
    @GetMapping("/all")
    public List<Audit> all() {
        return auditService.findAll();
    }

    @RequireJwtParam
    @PostMapping("/add")
    public void add(@Valid @RequestBody AuditCredentials auditCredentials, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult);
        }

        auditService.register(auditCredentials);
    }

    @RequireJwtParam
    @PostMapping("/my")
    public List<Audit> audits(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(String.valueOf(requestBody.get("userId")));
        return auditService.findUserAudits(userId);
    }
}
