package ru.mkim.backend.form;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
public class CompanyCredentials {

    @NonNull
    @NotEmpty(message = "Company name is required")
    @Size(max = 255, message = "Company name must be less than 255 characters")
    private String companyName;

    @NonNull
    @NotEmpty(message = "Company address is required")
    @Size(max = 255, message = "Company address must be less than 255 characters")
    private String companyAddress;

    @NonNull
    @NotEmpty(message = "Postal or Zip code is required")
    @Size(max = 20, message = "Postal or Zip code must be less than 20 characters")
    private String postalOrZipCode;

    @NonNull
    @NotEmpty(message = "Country or state is required")
    @Size(max = 100, message = "Country or state must be less than 100 characters")
    private String countryOrState;

    @NonNull
    @NotEmpty(message = "CEO name is required")
    @Size(max = 255, message = "CEO name must be less than 255 characters")
    private String companyCeoName;

    @NonNull
    @NotEmpty(message = "Head phone number is required")
    @Pattern(regexp = "\\+?[0-9]+", message = "Head phone number must be a valid phone number")
    private String headPhoneNumber;

    @NonNull
    @NotEmpty(message = "Head email is required")
    @Email(message = "Head email should be valid")
    private String headEmail;

    @NonNull
    @NotEmpty(message = "Website is required")
    @Size(max = 255, message = "Website must be less than 255 characters")
    private String webSite;

    @NonNull
    @NotEmpty(message = "Contact person name is required")
    @Size(max = 255, message = "Contact person name must be less than 255 characters")
    private String contactPersonName;

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
    @NotEmpty(message = "Requested accreditation is required")
    @Size(max = 255, message = "Requested accreditation must be less than 255 characters")
    private String requestedAccreditation;

    @NonNull
    @NotEmpty(message = "Product type is required")
    @Size(max = 255, message = "Product type must be less than 255 characters")
    private String productType;

    private long totalWorkerCount;

    private long organizationShiftNumber;

    private long workingDayDurationHours;

    @Size(max = 100, message = "Primary language must be less than 100 characters")
    private String primaryLanguage;

    @Size(max = 50, message = "Currency used must be less than 50 characters")
    private String currencyUsed;

    @Size(max = 500, message = "About section must be less than 500 characters")
    private String about;
}
