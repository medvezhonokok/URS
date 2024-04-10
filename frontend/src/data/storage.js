import axios from "axios";
import * as constants from "../constants/constants";

export const getCompanies = async () => {
    const jwtToken = localStorage.getItem('jwtToken');

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

export const getTasksByUserId = async () => {
    const jwtToken = localStorage.getItem('jwtToken');

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
    const jwtToken = localStorage.getItem('jwtToken');

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
            companyNames: user.userTask ? getUserCompanyNamesByTask(user.userTask) : null
        }));
    } catch (err) {
        console.error("Failed to get users: " + err);
        return [];
    }
}