import axios from "axios";
import * as constants from "../constants/constants";


const axiosInstance = axios.create({
    baseURL: constants.BACKEND_JAVA_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(config => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

/*
 *      User entity client utils.
 */

export const getUserByJWT = (jwtToken) => {
    return axiosInstance.get(`/1/users/auth?jwt=${jwtToken}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.error('Failed to fetch user information:', err);
        });
}

export const getJWTByUserCredentials = (login, password) => {
    return axios.post(constants.BACKEND_JAVA_URL + '/1/jwt', {
        login,
        password,
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        throw err.response.data;
    });
}

export const getUserById = (userId) => {
    return axiosInstance.get(`/1/users/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.log("Failed to get user by id: " + error);
            throw error;
        });
};

export const updateUserAuditCriterionMap = (auditCriterionMap) => {
    return axiosInstance.post(`/1/users/update_certificate_map`, auditCriterionMap)
        .then(() => {
        })
        .catch(error => {
            console.log("Failed to update audit criterion map: " + error);
            throw error;
        });
};

export const getUsers = () => {
    return axiosInstance.get(`/1/users/all`)
        .then(response => response.data)
        .catch(error => {
            console.error("Failed to get users: " + error);
            return [];
        });
};

/*
 *      Company entity client utils.
 */

export const addNewCompany = (newCompanyJson) => {
    return axiosInstance.post(`/company/add`, newCompanyJson)
        .then(response => response.data)
        .catch(error => {
            console.log("Failed to add company: " + error);
            throw error;
        });
};

export const getCompanies = () => {
    return axiosInstance.get(`/company/all`)
        .then(response => response.data)
        .catch(error => {
            console.error("Failed to get companies: " + error);
            return [];
        });
};

export const updateCompany = (companyId, updatedCompany) => {
    return axiosInstance.put(`/company/update/${companyId}`, updatedCompany)
        .then(() => {
        })
        .catch(error => {
            console.log("Failed to update company: " + error);
            throw error;
        });
};

export const getCompanyById = (companyId) => {
    return axiosInstance.get(`/company/${companyId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Failed to get company:", error);
            throw error;
        });
};

/*
 *      Audit entity client utils.
 */
export const addAudit = (auditData) => {
    return axiosInstance.post( `/audit/add`, auditData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.data)
        .catch(error => {
            console.error("Failed to add audit:", error);
            throw error;
        });
};

export const updateAudit = (auditId, updatedAudit) => {
    return axiosInstance.put( `/audit/update/${auditId}`, updatedAudit)
        .then(() =>{
        })
        .catch(error => {
            console.error("Failed to update audit:", error);
            throw error;
        });
};

export const deleteAudit = (auditId) => {
    return axiosInstance.delete( `/audit/delete/${auditId}`)
        .then(() =>{
        })
        .catch(error => {
            console.error("Failed to delete audit:", error);
            throw error;
        });
};
