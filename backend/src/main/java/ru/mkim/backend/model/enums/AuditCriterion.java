package ru.mkim.backend.model.enums;

import lombok.Getter;

@Getter
public enum AuditCriterion {
    ISO_9001_2015("ISO 9001:2015"),
    ISO_50001_2018("ISO 50001:2018"),
    ISO_45001_2018("ISO 45001:2018"),
    ISO_3834_2021("ISO 3834:2021"),
    ISO_37001_2016("ISO 37001:2016"),
    ISO_27001_2013("ISO 27001:2013"),
    ISO_22001_2018("ISO 22001:2018"),
    ISO_22000_2018("ISO 22000:2018"),
    ISO_20000_1_2018("ISO 20000-1:2018"),
    ISO_14001_2015("ISO 14001:2015"),
    ISO_13485_2016("ISO 13485:2016"),
    IATF_16949_2016_ISO_9001_2015("IATF 16949:2016 -> ISO 9001:2015"),
    IATF_16949_2016("IATF 16949:2016"),
    FSSC_22000("FSSC 22000"),
    GOST_R_ISO_9001_2015_GOST_RV_0015_002_2012("ГOСТ Р ИСО 9001-2015, доп. требования ГОСТ РВ 0015-002-2012"),
    GOST_ISO_13485_2017("ГОСТ ISO 13485-2017"),
    GOST_R_ISO_IEC_27001_2021("ГОСТ Р ИСО/МЭК 27001-2021"),
    GOST_R_ISO_9001_2015_SDS("ГОСТ Р ИСО 9001:2015 (СДС)"),
    GOST_R_ISO_45001("ГОСТ Р ИСО 45001"),
    GOST_R_ISO_14001("ГОСТ Р ИСО 14001"),
    GOST_R_58139_2018("ГОСТ Р 58139-2018"),
    EN_14065("EN 14065"),
    GOST_R_ISO_9001_2015_FSA("ГОСТ Р ИСО 9001-2015 (ФСА)"),
    IATF_16949_2016_REPORT("IATF 16949:2016 (отчет)");

    private final String typeString;

    AuditCriterion(String typeString) {
        this.typeString = typeString;
    }
}
