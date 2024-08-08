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
    private final CompanyService companyService;
    private final UserService userService;

    public AuditService(AuditRepository auditRepository, CompanyService companyService, UserService userService) {
        this.auditRepository = auditRepository;
        this.companyService = companyService;
        this.userService = userService;
    }

    public List<Audit> findAll() {
        return auditRepository.findAll();
    }

    public Audit findById(long auditId) {
        return auditRepository.findById(auditId).orElse(null);
    }

    public void add(AuditCredentials auditCredentials) {
        Audit audit = new Audit();
        Company company = companyService.findById(auditCredentials.getCompanyId());
        User user = userService.findById(auditCredentials.getUserId());
        company.setUser(user);
        companyService.save(company);

        copyCredentialsFieldsToAudit(audit, auditCredentials);
    }

    public void update(long auditId, AuditCredentials credentials) {
        Audit audit = findById(auditId);
        copyCredentialsFieldsToAudit(audit, credentials);
    }

    private void copyCredentialsFieldsToAudit(Audit audit, AuditCredentials auditCredentials) {
        audit.setActivity(auditCredentials.getActivity());
        audit.setLocation(auditCredentials.getLocation());
        audit.setAgreement(auditCredentials.getAgreement());
        audit.setStartDate(auditCredentials.getStartDate());
        audit.setEndDate(auditCredentials.getEndDate());
        audit.setClosingMeetingDate(auditCredentials.getClosingMeetingDate());
        audit.setCertificateExpirationDate(auditCredentials.getCertificateExpirationDate());

        auditRepository.save(audit);
    }

    public void delete(Long auditId) {
        auditRepository.deleteById(auditId);
    }
}
