package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.mkim.backend.model.Audit;

import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {

    @Query(value = "SELECT * FROM audit WHERE user_id=?1", nativeQuery = true)
    List<Audit> findAllByUserId(Long userId);
}
