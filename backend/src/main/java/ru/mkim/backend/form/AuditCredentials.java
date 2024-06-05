package ru.mkim.backend.form;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Setter
@Getter
public class AuditCredentials {

    @NonNull
    @NotEmpty(message = "Title is required")
    @Size(max = 25, message = "Title must be less than 25 characters")
    private String title;

    @NonNull
    @NotEmpty(message = "About is required")
    @Size(max = 100, message = "About must be less than 100 characters")
    private String about;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDateTime startDate;

    @Future(message = "End date must be in the future")
    private LocalDateTime endDate;
}
