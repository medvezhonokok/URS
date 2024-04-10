import React, {useEffect, useState} from 'react';
import * as storage from "../../data/storage";
import './Schedule.css';
import TopNavigationBar from "../TopNavigationBar/TopNavigationBar";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
import * as constants from "../../constants/constants";

const Schedule = ({user}) => {
    const [companies, setCompanies] = useState([]);
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        storage.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson)
            }
        );
    }, []);

    useEffect(() => {
        storage.getTasksByUserId().then(
            userTasksJson => {
                setUserTasks(userTasksJson)
            }
        );
    }, []);

    const mappedCompanies = companies.map(
        company => (
            <div className="companyCard" key={company.id}>
                Название: <p>{company.companyName}</p>
                О компании: <p>{company.about}</p>
                <Link to={`/company/${company.id}`}>
                    <button>Подробнее</button>
                </Link>
            </div>
        ));

    const userCeoContent =
        (<>
            <TopNavigationBar user={user}/>
            {mappedCompanies}
        </>);

    const markTaskAsDone = async (taskId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');

            await axios.post(constants.BACKEND_JAVA_URL + '/task/mark_as_done', {
                jwt: jwtToken,
                taskId: taskId
            });

            alert("Молодец! Выполнил");
            window.location.reload();
        } catch (err) {
            alert("Error while completing task: " + err)
        }
    }

    const userDefaultWorkerContent =
        (<>
            <TopNavigationBar user={user}/>
            {userTasks.map(
                task => (
                    <div className="centeredContent borderedBox">
                        <p>{task.content}</p>
                        <p>{task.status}</p>
                        <div>
                            <a href={task.inputUrl}>сюда</a>
                        </div>
                        <div>
                            <a href={task.outputUrl}>отсюда</a>
                        </div>

                        {task.status === "IN_PROCESS" &&
                            <Button onClick={() => markTaskAsDone(task.id)}>Пометить как выполненное</Button>}
                    </div>
                ))}
        </>)

    return user ? user.userRole === "CEO" ? userCeoContent : userDefaultWorkerContent : null;
};
export default Schedule;
