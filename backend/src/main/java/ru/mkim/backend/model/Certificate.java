package ru.mkim.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.annotation.Nullable;

@Entity
@Table(name = "certificate")
@Getter
@Setter
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(length = 40)
    private CertificateType certificateType;

    @Nullable
    private String certificateNumber;
}
