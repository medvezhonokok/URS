package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.form.CompanyCredentials;
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

    public Company findById(long companyId) {
        return companyRepository.findById(companyId).orElse(null);
    }

    public Company register(CompanyCredentials credentials) {
        return copyCredentialsFieldToCompany(new Company(), credentials);
    }

    public void save(Company company) {
        companyRepository.save(company);
    }

    public void update(long companyId, CompanyCredentials credentials) {
        copyCredentialsFieldToCompany(findById(companyId), credentials);
    }

    private Company copyCredentialsFieldToCompany(Company company, CompanyCredentials credentials) {
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
        company.setCertificateNumber(credentials.getCertificateNumber());
        company.setAuditCriterion(credentials.getAuditCriterion());
        company.setClosingMeetingDate(credentials.getClosingMeetingDate());
        company.setCertificateExpirationDate(credentials.getCertificateExpirationDate());

        return companyRepository.save(company);
    }
}
