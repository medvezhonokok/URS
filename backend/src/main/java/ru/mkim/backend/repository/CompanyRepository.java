package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.mkim.backend.model.Company;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    @Query(value = "SELECT * FROM company WHERE in_process=1", nativeQuery = true)
    List<Company> findAllInProcess();

    @Query(value = "SELECT * FROM company WHERE in_process=0", nativeQuery = true)
    List<Company> findAllNotInProcess();
}
