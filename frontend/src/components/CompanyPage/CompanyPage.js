import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as constants from "../../constants/constants";
import * as index from "../../index";
import axios from "axios";
import './CompanyPage.css';
import TopNavigationBar from "../TopNavigationBar/TopNavigationBar";
import * as storage from "../../data/storage";

const CompanyPage = () => {
    const user = index.getUser();

    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    const [selectedTask, setSelectedTask] = useState(null);
    const [company, setCompany] = useState(null);
    const {companyId} = useParams();
    const jwtToken = localStorage.getItem('jwtToken');

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const assignTaskToUser = () => {
        if (!selectedUserId) {
            alert("Заполните все поля");
            return;
        }

        if (!company) {
            alert("Unexpected error. Please, try again later.");
            return;
        }

        const jwtToken = localStorage.getItem('jwtToken');

        axios.post(constants.BACKEND_JAVA_URL + '/task/assign_to_user', {
            jwt: jwtToken,
            taskId: selectedTask.id,
            userId: selectedUserId,
        }).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch((err) => {
            console.error("Failed to get users: " + err);
        });
    }

    useEffect(() => {
        storage.getUsers().then(
            usersJson => {
                console.log(usersJson);
                setUsers(usersJson)
            }
        );
    }, []);

    useEffect(() => {
        if (user && companyId && jwtToken) {
            axios.post(constants.BACKEND_JAVA_URL + `/company/get_by_id?companyIdString=${companyId}&jwt=${jwtToken}`)
                .then(response => {
                    setCompany(response.data)
                }).catch(err => {
                console.log("Failed to get company: " + err)
            });
        }
    }, [user, companyId, jwtToken]);


    if (!user || !companyId || !jwtToken) {
        return null;
    }

    return (
        <div>
            {company ? (
                <>
                    <TopNavigationBar user={user}/>
                    <div className="companyCard centeredText" style={{width: "80%"}}>
                        <h1>{company.id}</h1>
                        <p>Название: {company.companyName}</p>
                        {!company.certificate ?
                            <>
                                отсутствует
                            </>
                            : <div>
                                <h1>Сертфикат:</h1>
                                <p>№: {company.certificate.certificateNumber}</p>
                                <p>Тип: {company.certificate.certificateType}</p>
                            </div>
                        }
                        О компании: <p>{company.about}</p>
                        {selectedTask && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={() => setSelectedTask(null)}>&times;</span>
                                    <h2>{selectedTask.content}</h2>
                                    <p>Дедлайн: {selectedTask.deadline}</p>
                                    <p>Status: {selectedTask.status}</p>
                                    <p>Executor: {selectedTask.user && selectedTask.user.name}</p>

                                    <div className="borderedBox centeredContent">
                                        <div className="borderedBottom">
                                            Добавить задание сотруднику:
                                        </div>
                                        <form>
                                            <div>
                                                <label htmlFor="userSelect">Выберите пользователя:</label>
                                                <select id="userSelect" onChange={(e) => setSelectedUserId(e.target.value)}>
                                                    <option value="">Выберите пользователя</option>
                                                    {users.map(user => (
                                                        <option key={user.id} value={user.id}>{user.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button type="button" onClick={assignTaskToUser}>Добавить задачу</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="borderedBox centeredContent">
                            {company.tasks.map(task => (
                                <div key={task.id} onClick={() => handleTaskClick(task)}>
                                    <div className="borderedBox centeredContent">
                                        Что сделать: <p>{task.content}</p>
                                        Дедлайн: <p>{task.deadline}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>No such company</p>
            )}
        </div>
    );
};

export default CompanyPage;
