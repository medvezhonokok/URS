package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.model.Certificate;
import ru.mkim.backend.repository.CertificateRepository;

@Service
public class CertificateService {
    private final CertificateRepository certificateRepository;

    public CertificateService(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    public void save(Certificate certificate) {
        certificateRepository.save(certificate);
    }
}
