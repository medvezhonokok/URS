import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as constants from "../../constants/constants";
import * as storage from "../../data/storage";
import './Schedule.css';

const Schedule = ({user}) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [taskContent, setTaskContent] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');

    const assignTaskToUser = () => {
        const jwtToken = localStorage.getItem('jwtToken');

        axios.post(constants.BACKEND_JAVA_URL + '/task/add', {
            jwt: jwtToken,
            content: taskContent,
            userId: selectedUserId,
            deadline: taskDeadline.concat(":00")
        })
            .then((response) => {
                alert(response.data);
                window.location.reload();
            })
            .catch((err) => {
                console.error("Failed to get users: " + err);
                setUsers([]);
            });
    }

    useEffect(() => {
        storage.getUsers().then(
            usersJson => {
                setUsers(usersJson)
            }
        );
    }, []);

    return (user ? <>
        {user.userRole === "CEO" && (<div>
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
                <div>
                    <label htmlFor="taskContent">Что надо сделать:</label>
                    <textarea id="taskContent" value={taskContent}
                              onChange={(e) => setTaskContent(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="taskDeadline">Дата выполнения:</label>
                    <input type="datetime-local" id="taskDeadline" value={taskDeadline}
                           onChange={(e) => setTaskDeadline(e.target.value)}/>
                </div>
                <button type="button" onClick={assignTaskToUser}>Добавить задачу</button>
            </form>
        </div>)}
    </> : null);
};
export default Schedule;
