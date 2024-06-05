package ru.mkim.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "login"))
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotEmpty
    @Size(min = 1, max = 12)
    @Pattern(regexp = "[0-9]{1,12}")
    private String phoneNumber;

    @NotEmpty
    @Size(min = 2, max = 24)
    @Pattern(regexp = "[a-zA-Z]{2,24}")
    private String login;

    @NotEmpty
    @Size(min = 2, max = 24)
    @Pattern(regexp = "[a-zA-Z]{6,36}")
    private String name;

    @Size(max = 250)
    private String about;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private boolean inProcess;

    private String certificates;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Audit> audits;
}
