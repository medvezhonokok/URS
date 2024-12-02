package ru.mkim.backend.form;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Setter
@Getter
public class AuditCredentials {
    @NotNull(message = "Company ID is required")
    private Long companyId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private LocalDate endDate;

    @NotNull(message = "Informal start date is required")
    @FutureOrPresent(message = "Informal start date must be in the present or future")

    private LocalDate informalStartDate;

    @NotNull(message = "Informal end date is required")
    @Future(message = "Informal end date must be in the future")
    private LocalDate informalEndDate;
}
