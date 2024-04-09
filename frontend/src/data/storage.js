import axios from "axios";
import * as constants from "../constants/constants";

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