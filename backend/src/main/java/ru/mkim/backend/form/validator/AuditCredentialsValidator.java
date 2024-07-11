package ru.mkim.backend.form.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.mkim.backend.form.AuditCredentials;
import ru.mkim.backend.model.Audit;
import ru.mkim.backend.model.User;
import ru.mkim.backend.service.AuditService;
import ru.mkim.backend.service.UserService;

import java.time.LocalDate;
import java.util.List;

@SuppressWarnings("NullableProblems")
@Component
public class AuditCredentialsValidator implements Validator {
    private final UserService userService;
    private final AuditService auditService;

    public AuditCredentialsValidator(UserService userService, AuditService auditService) {
        this.userService = userService;
        this.auditService = auditService;
    }

    public boolean supports(Class<?> clazz) {
        return AuditCredentials.class.equals(clazz);
    }

    public void validate(Object target, Errors errors) {
        if (!errors.hasErrors()) {
            AuditCredentials audit = (AuditCredentials) target;
            User user = userService.findById(audit.getUserId());

            if (user == null) {
                errors.reject("no-such-user", "No such user");
            } else {
                List<Audit> userAudits = auditService.findAll().stream().filter(
                        a -> a.getUser() != null && a.getUser().getId() == user.getId()).toList();

                LocalDate auditStartDate = audit.getStartDate();
                LocalDate auditEndDate = audit.getEndDate();

                if (auditStartDate.isAfter(auditEndDate)) {
                    errors.reject("audit-start-date-after-end-date",
                            "Некорретные даты начала и конца аудита.");
                }

                for (Audit userAudit : userAudits) {
                    LocalDate startDate = userAudit.getStartDate();
                    LocalDate endDate = userAudit.getEndDate();

                    if (endDate.isAfter(auditStartDate) && startDate.isBefore(auditEndDate)
                            || endDate.isEqual(auditStartDate) || startDate.isEqual(auditEndDate)) {
                        errors.reject("audit-overlap",
                                "Выбранные даты аудита пересекаются с текущим расписанием аудитора.");
                        break;
                    }
                }
            }
        }
    }
}
