package ru.mkim.backend.form;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import ru.mkim.backend.model.AuditCriterion;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
public class CompanyCredentials {

    @NonNull
    @NotEmpty(message = "English name is required")
    @Size(max = 255, message = "English name must be less than 255 characters")
    private String englishName;

    @NonNull
    @NotEmpty(message = "Russian name is required")
    @Size(max = 255, message = "Russian name must be less than 255 characters")
    private String russianName;

    @NonNull
    @NotEmpty(message = "English address is required")
    @Size(max = 255, message = "English address must be less than 255 characters")
    private String englishAddress;

    @NonNull
    @NotEmpty(message = "Russian address is required")
    @Size(max = 255, message = "Russian address must be less than 255 characters")
    private String russianAddress;

    @NonNull
    @NotEmpty(message = "Postal or Zip code is required")
    @Size(max = 20, message = "Postal or Zip code must be less than 20 characters")
    private String postalOrZipCode;

    @NonNull
    @NotEmpty(message = "Country or state is required")
    @Size(max = 100, message = "Country or state must be less than 100 characters")
    private String countryOrState;

    @NonNull
    @NotEmpty(message = "English manager name is required")
    @Size(max = 255, message = "English manager name must be less than 255 characters")
    private String englishManagerName;

    @NonNull
    @NotEmpty(message = "Russian manager name is required")
    @Size(max = 255, message = "Russian manager name must be less than 255 characters")
    private String russianManagerName;

    @NonNull
    @NotEmpty(message = "Manager position is required")
    @Size(max = 255, message = "Manager position must be less than 255 characters")
    private String managerPosition;

    @NonNull
    @NotEmpty(message = "Manager phone number is required")
    @Pattern(regexp = "\\+?[0-9]+", message = "Manager phone number must be a valid phone number")
    private String managerPhoneNumber;

    @NonNull
    @NotEmpty(message = "Manager email is required")
    @Email(message = "Manager email should be valid")
    private String managerEmail;

    @NonNull
    @NotEmpty(message = "Website is required")
    @Size(max = 255, message = "Website must be less than 255 characters")
    private String webSite;

    @NonNull
    @NotEmpty(message = "English contact person name is required")
    @Size(max = 255, message = "English contact person name must be less than 255 characters")
    private String englishContactPersonName;

    @NonNull
    @NotEmpty(message = "Russian contact person name is required")
    @Size(max = 255, message = "Russian contact person name must be less than 255 characters")
    private String russianContactPersonName;

    @NonNull
    @NotEmpty(message = "Contact person position is required")
    @Size(max = 255, message = "Contact person position must be less than 255 characters")
    private String contactPersonPosition;

    @NonNull
    @NotEmpty(message = "Contact person email is required")
    @Email(message = "Contact person email should be valid")
    private String contactPersonEmail;

    @NonNull
    @NotEmpty(message = "TIN is required")
    @Size(max = 20, message = "TIN must be less than 20 characters")
    private String tin;

    @NonNull
    @NotEmpty(message = "OKVED is required")
    @Size(max = 20, message = "OKVED must be less than 20 characters")
    private String okved;

    @NonNull
    @NotEmpty(message = "English certification scope is required")
    @Size(max = 255, message = "English certification scope must be less than 255 characters")
    private String englishCertificationScope;

    @NonNull
    @NotEmpty(message = "Russian certification scope is required")
    @Size(max = 255, message = "Russian certification scope must be less than 255 characters")
    private String russianCertificationScope;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(length = 40)
    private AuditCriterion auditCriterion;
}
