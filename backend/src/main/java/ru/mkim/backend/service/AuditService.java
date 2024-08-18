package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.form.AuditCredentials;
import ru.mkim.backend.model.Audit;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.model.User;
import ru.mkim.backend.repository.AuditRepository;

import java.util.List;

@Service
public class AuditService {
    private final AuditRepository auditRepository;
    private final UserService userService;
    private final CompanyService companyService;

    public AuditService(AuditRepository auditRepository, UserService userService,
                        CompanyService companyService) {
        this.auditRepository = auditRepository;
        this.userService = userService;
        this.companyService = companyService;
    }

    public List<Audit> findAll() {
        return auditRepository.findAll();
    }

    public void register(AuditCredentials auditCredentials) {
        Audit audit = new Audit();
        Company company = companyService.findById(auditCredentials.getCompanyId());
        User user = userService.findById(auditCredentials.getUserId());

        company.setUser(user);
        companyService.save(company);

        audit.setActivity(auditCredentials.getActivity());
        audit.setLocation(auditCredentials.getLocation());
        audit.setAgreement(auditCredentials.getAgreement());
        audit.setCompany(company);
        audit.setUser(user);
        audit.setStartDate(auditCredentials.getStartDate());
        audit.setInformalStartDate(auditCredentials.getInformalStartDate());
        audit.setEndDate(auditCredentials.getEndDate());
        audit.setInformalEndDate(auditCredentials.getInformalEndDate());
        audit.setCompanyName(company.getEnglishName());

        auditRepository.save(audit);
    }

    public List<Audit> findUserAudits(Long userId) {
        return auditRepository.findAllByUserId(userId);
    }
}
