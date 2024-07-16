package ru.mkim.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.mkim.backend.util.StringUtil;

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

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private String certificates;

    @OneToMany(mappedBy = "user")
    private List<Audit> audits;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Company> companies;

    public boolean competentByAuditCriterion(AuditCriterion auditCriterion) {
        if (StringUtil.isNullOrEmpty(certificates)) {
            return false;
        }

        int criterionIndex = 0;

        for (AuditCriterion criterion : AuditCriterion.values()) {
            if (criterion == auditCriterion) {
                break;
            }

            criterionIndex++;
        }

        return certificates.split("#")[criterionIndex].equals("1");
    }
}
