package ru.mkim.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.annotation.Nullable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "company")
@Getter
@Setter
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private String companyName;

    @NonNull
    private String companyAddress;

    @NonNull
    private String postalOrZipCode;

    @NonNull
    private String countryOrState;

    @NonNull
    private String companyCeoName;

    @NonNull
    private String headPhoneNumber;

    @NonNull
    private String headEmail;

    @NonNull
    private String webSite;

    @NonNull
    private String contactPersonName;

    @NonNull
    private String contactPersonEmail;

    @NonNull
    private String tin;

    @NonNull
    private String okved;

    @NonNull
    private String requestedAccreditation;

    @NonNull
    private String productType;

    private long totalWorkerCount;

    private long organizationShiftNumber;

    private long workingDayDurationHours;

    private String primaryLanguage;

    private String currencyUsed;

    @CreationTimestamp
    private LocalDateTime creationTime;

    @Nullable
    @OneToOne
    @JoinColumn(name = "certificate_id")
    private Certificate certificate;

    private String about;

    @Nullable
    private String pathToReceiptOfPayment;

    @JsonManagedReference
    @OneToMany(mappedBy = "company")
    private List<Task> tasks;

    private boolean inProcess;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Audit audit;

    public boolean getInProcess() {
        if (tasks != null && !tasks.isEmpty()) return tasks.stream().anyMatch(task -> task.getUser() != null);
        return false;
    }
}
