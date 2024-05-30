import axios from "axios";
import * as constants from "../constants/constants";

const jwtToken = localStorage.getItem('jwtToken');

export const getCompanyById = async (companyId) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/company/get_by_id?companyId=${companyId}&jwt=${jwtToken}`)
        .then(response => {
            return response.data;
        }).catch(err => {
            console.log("Failed to get company: " + err)
        });
}

export const updateUserCertificatesMap = async (userCertificateMap) => {
    await axios.post(constants.BACKEND_JAVA_URL + `/1/users/update_certificate_map`, userCertificateMap, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {

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
    await axios.get(constants.BACKEND_JAVA_URL + `/appointment/all`)
        .then(response => {
            return response.data.map((app) => ({
                id: app.id,
                title: app.title,
                startTime: app.startTime,
                endTime: app.endTime,
            }));
        }).catch(err => {
            console.log("Failed to get appointment: " + err)
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

export const addAppointment = async (newAppt) => {
    try {
        console.log(newAppt);
        await axios.post(constants.BACKEND_JAVA_URL + '/appointment/add', newAppt, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.log("Failed to add appointment");
    }
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