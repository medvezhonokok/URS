package ru.mkim.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit")
@Getter
@Setter
public class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Size(max = 25)
    private String title;

    @NonNull
    @Size(max = 100)
    private String about;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
