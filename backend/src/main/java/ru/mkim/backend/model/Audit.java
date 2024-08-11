package ru.mkim.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "audit")
@Getter
@Setter
public class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Size(max = 100)
    private String location;

    @NonNull
    @Size(max = 100)
    private String activity;

    @NonNull
    @Size(max = 100)
    private String agreement;

    private LocalDate closingMeetingDate;

    private LocalDate certificateExpirationDate;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDate informalStartDate;

    private LocalDate informalEndDate;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    private String companyName;

    public String getCompanyName() {
        return company.getEnglishName();
    }
}
