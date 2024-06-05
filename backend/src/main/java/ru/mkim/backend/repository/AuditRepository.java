package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mkim.backend.model.Audit;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {

}
