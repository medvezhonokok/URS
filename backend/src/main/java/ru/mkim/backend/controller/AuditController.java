package ru.mkim.backend.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.form.AuditCredentials;
import ru.mkim.backend.form.validator.AuditCredentialsValidator;
import ru.mkim.backend.model.Audit;
import ru.mkim.backend.service.AuditService;
import ru.mkim.backend.service.CompanyService;
import ru.mkim.backend.service.UserService;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    private final UserService userService;
    private final CompanyService companyService;
    private final AuditService auditService;

    private final AuditCredentialsValidator auditCredentialsValidator;

    public AuditController(UserService userService, CompanyService companyService,
                           AuditService auditService, AuditCredentialsValidator auditCredentialsValidator) {
        this.userService = userService;
        this.companyService = companyService;
        this.auditService = auditService;
        this.auditCredentialsValidator = auditCredentialsValidator;
    }

    @InitBinder("auditCredentials")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(auditCredentialsValidator);
    }

    @GetMapping("/all")
    public List<Audit> all() {
        return auditService.findAll();
    }

    @PostMapping("/add")
    public void add(@Valid @RequestBody AuditCredentials auditCredentials,
                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().toString());
        }

        Audit audit = new Audit();

        audit.setTitle(auditCredentials.getTitle());
        audit.setAbout(auditCredentials.getAbout());
        audit.setCompany(companyService.findById(auditCredentials.getCompanyId()));
        audit.setUser(userService.findById(auditCredentials.getUserId()));
        audit.setStartDate(auditCredentials.getStartDate());
        audit.setEndDate(auditCredentials.getEndDate());

        auditService.save(audit);
    }
}