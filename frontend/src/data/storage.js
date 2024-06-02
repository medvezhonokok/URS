import axios from "axios";
import * as constants from "../constants/constants";
import { DateTime } from "luxon";

const jwtToken = localStorage.getItem('jwtToken');


export const getCompanyById = async (companyId) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/company/get_by_id?companyId=${companyId}&jwt=${jwtToken}`)
        .then(response => {
            return response.data;
        }).catch(err => {
            console.log("Failed to get company: " + err)
        });
}

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(constants.BACKEND_JAVA_URL + `/1/users/${userId}`)
        return response.data;
    } catch (err) {
        console.log("Failed to get user by id: " + err)
    }
}

export const updateUserCertificatesMap = async (userCertificateMap) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/1/users/update_certificate_map`, userCertificateMap, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // No operations.
    })
}

export const addNewCompany = (newCompanyJson) => {
    axios.post(constants.BACKEND_JAVA_URL + '/company/add', newCompanyJson, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log("Failed to add company: " + err);
    })
}

export const getCompanies = async () => {
    try {
        const response = await axios.post(constants.BACKEND_JAVA_URL + '/company/all?jwt=' + jwtToken);
        return response.data.map(company => ({
            id: company.id,
            certificate: company.certificate,
            about: company.about,
            inProcess: company.inProcess,
            companyName: company.companyName,
        }));
    } catch (err) {
        console.error("Failed to get companies: " + err);
        return [];
    }
}

export const getAppointments = async () => {
    try {
        const response = await axios.post(constants.BACKEND_JAVA_URL + '/appointment/all?jwt=' + jwtToken);
        return response.data.map(app => ({
            id: app.id,
            title: app.title,
            startDate: app.startTime,
            endDate: app.endTime,
            color: app.color
        }));
    } catch (err) {
        console.error("Failed to get appointments: " + err);
        return [];
    }
}


export const deleteAppointment = async (id) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/appointment/delete/${id}`).then(response => {
        // No operations.
    }).catch(err => {
        console.error("Failed to delete appointment: " + err);
    })
}


export const updateAppointment = async (appointment) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/appointment/update`, appointment, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        // ignored
    }).catch(err => {
        console.log("Failed to update appointment: " + err)
    });
}


export const saveNewAppointment = async (appointment) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/appointment/add`, appointment, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        // ignored
    }).catch(err => {
        console.log("Failed to add appointment: " + err)
    });
}

export const getTasksByUserId = async () => {
    try {
        const response = await axios.post(constants.BACKEND_JAVA_URL + '/task/all_by_user_id', {
            jwt: jwtToken
        });
        return response.data.map(task => ({
            id: task.id,
            content: task.content,
            inputUrl: task.inputUrl,
            outputUrl: task.outputUrl,
            status: task.status,
        }));
    } catch (err) {
        console.error("Failed to get tasks by userId: " + err);
        return [];
    }
}

export const getUsers = async () => {
    function getUserCompanyNamesByTask(userTasks) {
        return userTasks.map(
            userTask => (
                userTask.company ? userTask.company.companyName : null
            ));
    }

    try {
        const response = await axios.get(constants.BACKEND_JAVA_URL + '/1/users/all?jwt=' + jwtToken);
        return response.data.map(user => ({
            id: user.id,
            login: user.login,
            phoneNumber: user.phoneNumber,
            name: user.name,
            about: user.about,
            role: user.userRole,
            inProcess: user.inProcess,
            companyNames: user.userTask ? getUserCompanyNamesByTask(user.userTask) : null,
            certificates: user.certificates
        }));
    } catch (err) {
        console.error("Failed to get users: " + err);
        return [];
    }
}

export const CertificateTypes = [
    {key: "IATF_16949", value: "IATF 16949"},
    {key: "ГОСТР_58139", value: "ГОСТР 58139"},
    {key: "ISO_9001", value: "ISO 9001"},
    {key: "ISO_9001_2015", value: "ISO 9001:2015"},
    {key: "ISO_50001_2018", value: "ISO 50001:2018"},
    {key: "ISO_45001_2018", value: "ISO 45001:2018"},
    {key: "ISO_3834_2021", value: "ISO 3834:2021"},
    {key: "ISO_37001_2016", value: "ISO 37001:2016"},
    {key: "ISO_27001_2013", value: "ISO 27001:2013"},
    {key: "ISO_22001_2018", value: "ISO 22001:2018"},
    {key: "ISO_22000_2018", value: "ISO 22000:2018"},
    {key: "ISO_20000_1_2018", value: "ISO 20000-1:2018"},
    {key: "ISO_14001_2015", value: "ISO 14001:2015"},
    {key: "ISO_13485_2016", value: "ISO 13485:2016"},
    {key: "IATF_16949_2016_TO_ISO_9001_2015", value: "IATF 16949:2016 -> ISO 9001:2015"},
    {key: "IATF_16949_2016", value: "IATF 16949:2016"},
    {key: "FSSC_22000", value: "FSSC 22000"},
    {key: "ГОСТ_ISO_13485_2017", value: "ГОСТ ISO 13485-2017"},
    {key: "ГОСТ_Р_ИСО_МЭК_27001_2021", value: "ГОСТ Р ИСО/МЭК 27001-2021"},
    {key: "ГОСТ_Р_ИСО_9001_2015_СДС", value: "ГОСТ Р ИСО 9001:2015 (СДС)"},
    {key: "ГОСТ_Р_ИСО_45001", value: "ГОСТ Р ИСО 45001"},
    {key: "ГОСТ_Р_ИСО_14001", value: "ГОСТ Р ИСО 14001"},
    {key: "ГОСТ_Р_58139_2018", value: "ГОСТ Р 58139-2018"},
    {key: "EN_14065", value: "EN 14065"},
    {key: "ГОСТ_Р_ИСО_14001_2016", value: "ГОСТ Р ИСО 14001-2016"},
    {key: "ГОСТ_Р_ИСО_9001_2015_ФСА", value: "ГОСТ Р ИСО 9001-2015 (ФСА)"}
];