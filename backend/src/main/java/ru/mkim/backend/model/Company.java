package ru.mkim.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.annotation.Nullable;
import java.util.List;

@Entity
@Table(name = "company")
@Getter
@Setter
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Nullable
    @OneToOne
    @JoinColumn(name = "certificate_id")
    private Certificate certificate;

    private String about;

    @NonNull
    private String companyName;

    @Nullable
    private String pathToReceiptOfPayment;

    @JsonManagedReference
    @OneToMany(mappedBy = "company")
    private List<Task> tasks;

    private boolean inProcess;
}