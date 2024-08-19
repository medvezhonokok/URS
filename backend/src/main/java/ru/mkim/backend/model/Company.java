package ru.mkim.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import ru.mkim.backend.model.enums.AuditCriterion;
import ru.mkim.backend.model.enums.CompanyStatus;

import javax.annotation.Nullable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "company")
@Getter
@Setter
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private String englishName;

    @NonNull
    private String russianName;

    @NonNull
    private String englishAddress;

    @NonNull
    private String russianAddress;

    @NonNull
    private String postalOrZipCode;

    @NonNull
    private String countryOrState;

    @NonNull
    private String englishManagerName;

    @NonNull
    private String russianManagerName;

    @NonNull
    private String managerPosition;

    @NonNull
    private String managerPhoneNumber;

    @NonNull
    private String managerEmail;

    @NonNull
    private String webSite;

    @NonNull
    private String englishContactPersonName;

    @NonNull
    private String russianContactPersonName;

    @NonNull
    private String contactPersonPosition;

    @NonNull
    private String contactPersonEmail;

    @NonNull
    private String tin;

    @NonNull
    private String okved;

    @NonNull
    private String englishCertificationScope;

    @NonNull
    private String russianCertificationScope;

    @CreationTimestamp
    private LocalDateTime creationTime;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Audit audit;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(length = 40)
    private AuditCriterion auditCriterion;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(length = 40)
    private CompanyStatus status;

    @Nullable
    private String certificateNumber;

    @Nullable
    private LocalDate closingMeetingDate;

    @Nullable
    private LocalDate certificateExpirationDate;

    @NonNull
    private String activity;

    @NonNull
    private String location;

    @NonNull
    private String agreement;
}
