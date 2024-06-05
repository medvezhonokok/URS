package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.form.UserCredentials;
import ru.mkim.backend.form.validator.UserCredentialsRegisterValidator;
import ru.mkim.backend.model.AuditCriterion;
import ru.mkim.backend.model.User;
import ru.mkim.backend.service.JwtService;
import ru.mkim.backend.service.UserService;
import ru.mkim.backend.util.StringUtil;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/1/users")
public class UserController {
    private final JwtService jwtService;
    private final UserService userService;
    private final UserCredentialsRegisterValidator userCredentialsRegisterValidator;

    public UserController(JwtService jwtService,
                          UserService userService,
                          UserCredentialsRegisterValidator userCredentialsRegisterValidator) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userCredentialsRegisterValidator = userCredentialsRegisterValidator;
    }

    @InitBinder("userCredentialsRegister")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsRegisterValidator);
    }

    @GetMapping("/{userId}")
    public User findById(@PathVariable Long userId) {
        return userService.findById(userId);
    }

    @GetMapping("/auth")
    public User findUserByJwt(@RequestParam String jwt) {
        return jwtService.findUserByJWT(jwt);
    }

    @PostMapping
    public UserCredentials register(@RequestBody @Valid UserCredentials credentials,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().toString());
        }
        userService.register(credentials);
        return credentials;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll(@RequestParam String jwt) {
        if (StringUtil.isNotNullOrEmpty(jwt)) {
            return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/update_certificate_map")
    public ResponseEntity<String> updateCertificateMap(@RequestBody Map<String, Map<String, Boolean>> userCertificateMap) {
        for (Map.Entry<String, Map<String, Boolean>> entry : userCertificateMap.entrySet()) {
            User user = userService.findById(Long.parseLong(entry.getKey()));

            int certificateSize = AuditCriterion.values().length;
            final String[] certificates = new String[certificateSize];
            int index = 0;

            for (AuditCriterion value : AuditCriterion.values()) {
                certificates[index++] = entry.getValue().get(value.toString()) ? "1" : "0";
            }

            userService.updateCertificates(user.getId(), String.join("#", certificates));
        }

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
