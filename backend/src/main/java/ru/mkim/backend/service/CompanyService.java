package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.form.CompanyCredentials;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.model.User;
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

    public void save(Company company) {
        companyRepository.save(company);
    }

    public Company getById(long id) {
        return companyRepository.findById(id).orElse(null);
    }

    public Company findById(Long companyId) {
        return companyRepository.findById(companyId).orElse(null);
    }

    public void register(CompanyCredentials credentials) {
        Company company = new Company();

        company.setCompanyName(credentials.getCompanyName());
        company.setCompanyAddress(credentials.getCompanyAddress());
        company.setPostalOrZipCode(credentials.getPostalOrZipCode());
        company.setCountryOrState(credentials.getCountryOrState());
        company.setCompanyCeoName(credentials.getCompanyCeoName());
        company.setHeadPhoneNumber(credentials.getHeadPhoneNumber());
        company.setHeadEmail(credentials.getHeadEmail());
        company.setWebSite(credentials.getWebSite());
        company.setContactPersonName(credentials.getContactPersonName());
        company.setContactPersonEmail(credentials.getContactPersonEmail());
        company.setTin(credentials.getTin());
        company.setOkved(credentials.getOkved());
        company.setRequestedAccreditation(credentials.getRequestedAccreditation());
        company.setProductType(credentials.getProductType());
        company.setTotalWorkerCount(credentials.getTotalWorkerCount());
        company.setOrganizationShiftNumber(credentials.getOrganizationShiftNumber());
        company.setWorkingDayDurationHours(credentials.getWorkingDayDurationHours());
        company.setPrimaryLanguage(credentials.getPrimaryLanguage());
        company.setCurrencyUsed(credentials.getCurrencyUsed());
        company.setAbout(credentials.getAbout());

        companyRepository.save(company);
    }
}
