package ru.mkim.backend.form.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.mkim.backend.form.CompanyCredentials;

@SuppressWarnings("NullableProblems")
@Component
public class CompanyCredentialsValidator implements Validator {

    public CompanyCredentialsValidator() {
    }

    public boolean supports(Class<?> clazz) {
        return CompanyCredentials.class.equals(clazz);
    }

    public void validate(Object target, Errors errors) {
        if (!errors.hasErrors()) {
            CompanyCredentials credentials = (CompanyCredentials) target;

            // TODO....validate if needed
        }
    }
}
