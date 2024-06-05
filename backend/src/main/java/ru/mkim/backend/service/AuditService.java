package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.model.Audit;
import ru.mkim.backend.repository.AuditRepository;

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
}
