package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mkim.backend.model.Certificate;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
}
