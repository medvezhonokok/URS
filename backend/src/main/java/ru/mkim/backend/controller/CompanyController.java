package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.form.CompanyCredentials;
import ru.mkim.backend.form.validator.CompanyCredentialsValidator;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.model.User;
import ru.mkim.backend.service.CompanyService;
import ru.mkim.backend.service.JwtService;
import ru.mkim.backend.util.StringUtil;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    private final CompanyService companyService;
    private final JwtService jwtService;
    private final CompanyCredentialsValidator companyCredentialsValidator;

    public CompanyController(CompanyService companyService, JwtService jwtService,
                             CompanyCredentialsValidator companyCredentialsValidator) {
        this.companyService = companyService;
        this.jwtService = jwtService;
        this.companyCredentialsValidator = companyCredentialsValidator;
    }

    @InitBinder("companyCredentials")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(companyCredentialsValidator);
    }

    @GetMapping("/all")
    public List<Company> getAllInProcess(@RequestParam String jwt) {
        if (StringUtil.isNotNullOrEmpty(jwt)) {
            User user = jwtService.findUserByJWT(jwt);

            if (user != null) {
                return companyService.findAll();
            }
        }

        return new ArrayList<>();
    }

    @GetMapping("/get_by_id")
    public ResponseEntity<Company> getCompanyByCompanyId(@RequestParam String companyId, @RequestParam String jwt) {
        try {
            Long id = Long.parseLong(companyId);
            if (StringUtil.isNotNullOrEmpty(jwt)) {
                User user = jwtService.findUserByJWT(jwt);

                if (user != null) {
                    return new ResponseEntity<>(companyService.findById(id), HttpStatusCode.valueOf(200));
                }
            }
        } catch (Exception ignored) {
            // No operations.
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewCompany(@RequestBody @Valid CompanyCredentials credentials,
                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().toString());
        }
        companyService.register(credentials);
        return new ResponseEntity<>("Company was created", HttpStatus.OK);
    }

    @PutMapping("/update/{companyId}")
    public ResponseEntity<String> updateCompany(@PathVariable Long companyId, @RequestBody @Valid CompanyCredentials credentials,
                                                BindingResult bindingResult) {
        companyService.update(companyId, credentials);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
