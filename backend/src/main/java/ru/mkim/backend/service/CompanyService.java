package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.repository.CompanyRepository;

import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public List<Company> findAllInProcess() {
        return companyRepository.findAllInProcess();
    }

    public List<Company> findAllNotInProcess() {
        return companyRepository.findAllNotInProcess();
    }

    public void save(Company company) {
        companyRepository.save(company);
    }
}
