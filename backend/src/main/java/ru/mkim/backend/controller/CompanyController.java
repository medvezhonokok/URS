package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.annotation.RequireJwtParam;
import ru.mkim.backend.form.CompanyCredentials;
import ru.mkim.backend.form.validator.CompanyCredentialsValidator;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.service.CompanyService;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    private final CompanyService companyService;
    private final CompanyCredentialsValidator companyCredentialsValidator;

    public CompanyController(CompanyService companyService, CompanyCredentialsValidator companyCredentialsValidator) {
        this.companyService = companyService;
        this.companyCredentialsValidator = companyCredentialsValidator;
    }

    @InitBinder("companyCredentials")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(companyCredentialsValidator);
    }

    @RequireJwtParam
    @GetMapping("/all")
    public List<Company> getAll() {
        return companyService.findAll();
    }

    @RequireJwtParam
    @GetMapping("/{companyId}")
    public ResponseEntity<Company> findById(@PathVariable String companyId) {
        try {
            long id = Long.parseLong(companyId);
            return new ResponseEntity<>(companyService.findById(id), HttpStatusCode.valueOf(200));
        } catch (NumberFormatException ignored) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequireJwtParam
    @PostMapping("/add")
    public ResponseEntity<Company> addNewCompany(@Valid @RequestBody CompanyCredentials credentials,
                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().toString());
        }

        return new ResponseEntity<>(companyService.register(credentials), HttpStatus.OK);
    }

    @RequireJwtParam
    @PutMapping("/update/{companyId}")
    public void updateCompany(@PathVariable Long companyId, @Valid @RequestBody CompanyCredentials credentials,
                              BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().toString());
        }

        companyService.update(companyId, credentials);
    }
}
