package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.model.User;
import ru.mkim.backend.service.CompanyService;
import ru.mkim.backend.service.JwtService;
import ru.mkim.backend.util.StringUtil;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    private final CompanyService companyService;
    private final JwtService jwtService;

    public CompanyController(CompanyService companyService, JwtService jwtService) {
        this.companyService = companyService;
        this.jwtService = jwtService;
    }

    @PostMapping("/all")
    public ResponseEntity<List<Company>> getAllInProcess(@RequestParam String jwtToken) {
        if (StringUtil.isNotNullOrEmpty(jwtToken)) {
            User user = jwtService.findUserByJWT(jwtToken);

            if (user != null) {
                return new ResponseEntity<>(companyService.findAll(), HttpStatusCode.valueOf(200));
            }
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
