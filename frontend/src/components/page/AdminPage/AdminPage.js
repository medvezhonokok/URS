import './AdminPage.css';
import React, {useEffect, useState} from "react";

const mockDevices = [
    {id: 1, ip: "192.168.0.1", device: "Laptop", isActive: true},
    {id: 2, ip: "192.168.0.2", device: "Mobile", isActive: true},
    {id: 3, ip: "192.168.0.3", device: "Tablet", isActive: false},
];

const AdminPage = ({user}) => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        setDevices(mockDevices);
    }, []);

    const handleDisableDevice = (deviceId) => {
        setDevices(devices.map(device =>
            device.id === deviceId ? {...device, isActive: false} : device
        ));
    };

    return user && user.role === "ADMIN" ? (
        <div className="commonPageContainer">
            <div className="commonPageHeader">Администрирование</div>
            <div className="deviceList">
                <h2>Устройства и IP-адреса</h2>
                <table>
                    <thead>
                    <tr>
                        <th>IP-адрес</th>
                        <th>Устройство</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {devices.map(device => (
                        <tr key={device.id}>
                            <td>{device.ip}</td>
                            <td>{device.device}</td>
                            <td>{device.isActive ? "Активен" : "Отключен"}</td>
                            <td>
                                {device.isActive && (
                                    <button onClick={() => handleDisableDevice(device.id)}>
                                        Отключить
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : null;
};

export default AdminPage;
