package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.form.AuditCredentials;
import ru.mkim.backend.form.CompanyCredentials;
import ru.mkim.backend.model.Audit;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.model.User;
import ru.mkim.backend.repository.AuditRepository;
import ru.mkim.backend.repository.CompanyRepository;

import java.util.List;

@Service
public class AuditService {
    private final AuditRepository auditRepository;

    public AuditService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public void save(Audit audit) {
        auditRepository.save(audit);
    }

    public List<Audit> findAll() {
        return auditRepository.findAll();
    }
    private Audit copyCredentialsFieldToAudit(Audit audit, AuditCredentials auditCredentials) {
        audit.setActivity(auditCredentials.getActivity());
        audit.setLocation(auditCredentials.getLocation());
        audit.setAgreement(auditCredentials.getAgreement());
        audit.setStartDate(auditCredentials.getStartDate());
        audit.setEndDate(auditCredentials.getEndDate());
        audit.setClosingMeetingDate(auditCredentials.getClosingMeetingDate());
        audit.setCertificateExpirationDate(auditCredentials.getCertificateExpirationDate());

        return auditRepository.save(audit);
    }

    public void update(long auditId, AuditCredentials credentials) {
        copyCredentialsFieldToAudit(findById(auditId), credentials);
    }

    public Audit findById(long auditId) {
        return auditRepository.findById(auditId).orElse(null);
    }
}
