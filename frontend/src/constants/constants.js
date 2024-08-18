export const BACKEND_JAVA_URL = "http://5.101.51.223:8080/api";
export const SITE_SECRET_KEY = "6LcibiQqAAAAAJuR19fsc1XKU_JBT3_ExHyYaF-J";

export const AuditCriterion = [
    {
        key: "ISO_9001_2015",
        value: "ISO 9001:2015"
    },
    {
        key: "ISO_50001_2018",
        value: "ISO 50001:2018"
    },
    {
        key: "ISO_45001_2018",
        value: "ISO 45001:2018"
    },
    {
        key: "ISO_3834_2021",
        value: "ISO 3834:2021"
    },
    {
        key: "ISO_37001_2016",
        value: "ISO 37001:2016"
    },
    {
        key: "ISO_27001_2013",
        value: "ISO 27001:2013"
    },
    {
        key: "ISO_22001_2018",
        value: "ISO 22001:2018"
    },
    {
        key: "ISO_22000_2018",
        value: "ISO 22000:2018"
    },
    {
        key: "ISO_20000_1_2018",
        value: "ISO 20000-1:2018"
    },
    {
        key: "ISO_14001_2015",
        value: "ISO 14001:2015"
    },
    {
        key: "ISO_13485_2016",
        value: "ISO 13485:2016"
    },
    {
        key: "IATF_16949_2016_ISO_9001_2015",
        value: "IATF 16949:2016 -> ISO 9001:2015"
    },
    {
        key: "IATF_16949_2016",
        value: "IATF 16949:2016"
    },
    {
        key: "FSSC_22000",
        value: "FSSC 22000"
    },
    {
        key: "GOST_R_ISO_9001_2015_GOST_RV_0015_002_2012",
        value: "ГOСТ Р ИСО 9001-2015, доп. требования ГОСТ РВ 0015-002-2012"
    },
    {
        key: "GOST_ISO_13485_2017",
        value: "ГОСТ ISO 13485-2017"
    },
    {
        key: "GOST_R_ISO_IEC_27001_2021",
        value: "ГОСТ Р ИСО/МЭК 27001-2021"
    },
    {
        key: "GOST_R_ISO_9001_2015_SDS",
        value: "ГОСТ Р ИСО 9001:2015 (СДС)"
    },
    {
        key: "GOST_R_ISO_45001",
        value: "ГОСТ Р ИСО 45001"
    },
    {
        key: "GOST_R_ISO_14001",
        value: "ГОСТ Р ИСО 14001"
    },
    {
        key: "GOST_R_58139_2018",
        value: "ГОСТ Р 58139-2018"
    },
    {
        key: "EN_14065",
        value: "EN 14065"
    },
    {
        key: "GOST_R_ISO_9001_2015_FSA",
        value: "ГОСТ Р ИСО 9001-2015 (ФСА)"
    },
    {
        key: "IATF_16949_2016_REPORT",
        value: "IATF 16949:2016 (отчет)"
    }
];

export const monthNames = [
    {value: 1, label: 'Январь'},
    {value: 2, label: 'Февраль'},
    {value: 3, label: 'Март'},
    {value: 4, label: 'Апрель'},
    {value: 5, label: 'Май'},
    {value: 6, label: 'Июнь'},
    {value: 7, label: 'Июль'},
    {value: 8, label: 'Август'},
    {value: 9, label: 'Сентябрь'},
    {value: 10, label: 'Октябрь'},
    {value: 11, label: 'Ноябрь'},
    {value: 12, label: 'Декабрь'},
];

export const COMPANY_FIELDS = (company) =>
    [
        {
            label: "Название организации [en]",
            value: company.englishName,
            name: "englishName"
        },
        {
            label: "Название организации [ru]",
            value: company.russianName,
            name: "russianName"
        },
        {
            label: "Фактический адрес организации [en]",
            value: company.englishAddress,
            name: "englishAddress"
        },
        {
            label: "Фактический адрес организации [ru]",
            value: company.russianAddress,
            name: "russianAddress"
        },
        {
            label: "Postal/Zip Code",
            value: company.postalOrZipCode,
            name: "postalOrZipCode"
        },
        {
            label: "Country/State",
            value: company.countryOrState,
            name: "countryOrState"
        },
        {
            label: "ФИО руководителя (без сокращений) [en]",
            value: company.englishManagerName,
            name: "englishManagerName"
        },
        {
            label: "ФИО руководителя (без сокращений) [ru]",
            value: company.russianManagerName,
            name: "russianManagerName"
        },
        {
            label: "Должность руководителя",
            value: company.managerPosition,
            name: "managerPosition"
        },
        {
            label: "Телефон руководителя",
            value: company.managerPhoneNumber,
            name: "managerPhoneNumber"
        },
        {
            label: "E-mail руководителя",
            value: company.managerEmail,
            name: "managerEmail"
        },
        {
            label: "Web site",
            value: company.webSite,
            name: "webSite"
        },
        {
            label: "ФИО контактного лица [en]",
            value: company.englishContactPersonName,
            name: "englishContactPersonName"
        },
        {
            label: "ФИО контактного лица [ru]",
            value: company.russianContactPersonName,
            name: "russianContactPersonName"
        },
        {
            label: "Должность контактного лица",
            value: company.contactPersonPosition,
            name: "contactPersonPosition"
        },
        {
            label: "E-mail контактного лица",
            value: company.contactPersonEmail,
            name: "contactPersonEmail"
        },
        {
            label: "ИНН",
            value: company.tin,
            name: "tin"
        },
        {
            label: "ОКВЭД",
            value: company.okved,
            name: "okved"
        },
        {
            label: "Активность",
            value: company.activity,
            name: "activity"
        },
        {
            label: "Локация",
            value: company.location,
            name: "location"
        },
        {
            label: "Договор",
            value: company.agreement,
            name: "agreement"
        },
        {
            label: "Область сертификации [en]",
            value: company.englishCertificationScope,
            name: "englishCertificationScope"
        },
        {
            label: "Область сертификации [ru]",
            value: company.russianCertificationScope,
            name: "russianCertificationScope"
        },
        {
            label: "Критерий аудита",
            value: company.auditCriterion,
            name: "auditCriterion"
        },
        {
            label: "Номер сертификата",
            value: company.certificateNumber,
            name: "certificateNumber"
        },
        {
            label: "Дата заключительного собрания",
            value: company.closingMeetingDate,
            name: "closingMeetingDate",
            type: 'date'
        },
        {
            label: "Дата истечения сертификата",
            value: company.certificateExpirationDate,
            name: "certificateExpirationDate",
            type: 'date'
        },
    ]

export const USER_FIELDS = (user) =>
    [
        {
            label: 'ФИО',
            value: user.name,
            id: 'name'
        },
        {
            label: 'Номер телефона',
            value: user.phoneNumber,
            id: 'phoneNumber'
        },
        {
            label: 'Email',
            value: user.email,
            id: 'email'
        },
    ]