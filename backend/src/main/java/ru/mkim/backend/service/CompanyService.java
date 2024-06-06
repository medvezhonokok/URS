package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.form.CompanyCredentials;
import ru.mkim.backend.model.Certificate;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.repository.CompanyRepository;

import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final CertificateService certificateService;

    public CompanyService(CompanyRepository companyRepository, CertificateService certificateService) {
        this.companyRepository = companyRepository;
        this.certificateService = certificateService;
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public Company findById(Long companyId) {
        return companyRepository.findById(companyId).orElse(null);
    }

    public void register(CompanyCredentials credentials) {
        Company company = new Company();
        Certificate certificate = new Certificate();

        certificate.setAuditCriterion(credentials.getAuditCriterion());

        company.setEnglishName(credentials.getEnglishName());
        company.setRussianName(credentials.getRussianName());
        company.setEnglishAddress(credentials.getEnglishAddress());
        company.setRussianAddress(credentials.getRussianAddress());
        company.setPostalOrZipCode(credentials.getPostalOrZipCode());
        company.setCountryOrState(credentials.getCountryOrState());
        company.setEnglishManagerName(credentials.getEnglishManagerName());
        company.setRussianManagerName(credentials.getRussianManagerName());
        company.setManagerPosition(credentials.getManagerPosition());
        company.setManagerPhoneNumber(credentials.getManagerPhoneNumber());
        company.setManagerEmail(credentials.getManagerEmail());
        company.setWebSite(credentials.getWebSite());
        company.setEnglishContactPersonName(credentials.getEnglishContactPersonName());
        company.setRussianContactPersonName(credentials.getRussianContactPersonName());
        company.setContactPersonPosition(credentials.getContactPersonPosition());
        company.setContactPersonEmail(credentials.getContactPersonEmail());
        company.setTin(credentials.getTin());
        company.setOkved(credentials.getOkved());
        company.setEnglishCertificationScope(credentials.getEnglishCertificationScope());
        company.setRussianCertificationScope(credentials.getRussianCertificationScope());

        certificateService.save(certificate);
        company.setCertificate(certificate);

        companyRepository.save(company);
    }

    public void save(Company company) {
        companyRepository.save(company);
    }
}
