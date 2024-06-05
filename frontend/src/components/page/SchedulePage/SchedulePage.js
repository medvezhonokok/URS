import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {EditingState, IntegratedEditing, ViewState} from '@devexpress/dx-react-scheduler';
import {
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    DragDropProvider,
    Scheduler,
    TodayButton,
    Toolbar,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import {appointments} from '../../../data/appointments';
import './SchedulePage.css';

const SchedulePage = ({user}) => {
    const [data, setData] = useState(appointments);
    const [currentDate, setCurrentDate] = useState('2024-05-25');
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 16) {
                setIsShiftPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.keyCode === 16) {
                setIsShiftPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const commitChanges = ({added, changed, deleted}) => {
        setData((prevData) => {
            let newData = prevData;
            if (added) {
                const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
                newData = [...newData, {id: startingAddedId, ...added}];
            }
            if (changed) {
                if (isShiftPressed) {
                    const changedAppointment = newData.find(appointment => changed[appointment.id]);
                    const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
                    newData = [
                        ...newData,
                        {...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id]},
                    ];
                } else {
                    newData = newData.map(appointment => (
                        changed[appointment.id]
                            ? {...appointment, ...changed[appointment.id]}
                            : appointment));
                }
            }
            if (deleted !== undefined) {
                newData = newData.filter(appointment => appointment.id !== deleted);
            }
            return newData;
        });
    };

    const appointmentComponent = ({style, ...restProps}) => {
        const {data} = restProps;
        return (
            <Appointments.Appointment
                {...restProps}
                style={{...style, backgroundColor: data.color}}
            />
        );
    };

    return user ? (
        <div>
            <SideBarMenu user={user}>
                <div className="usersPageContainer">
                    <h1 className="companiesHeader">Расписание</h1>
                    <Paper>
                        <Scheduler
                            data={data}
                            height={660}
                        >
                            <ViewState
                                currentDate={currentDate}
                                onCurrentDateChange={(date) => setCurrentDate(date)}
                            />
                            <EditingState
                                onCommitChanges={commitChanges}
                            />
                            <IntegratedEditing/>
                            <WeekView
                                startDayHour={9}
                                endDayHour={17}
                            />
                            <Toolbar/>
                            <DateNavigator/>
                            <TodayButton/>
                            <Appointments
                                appointmentComponent={appointmentComponent}
                            />
                            <AppointmentTooltip
                                showDeleteButton
                            />
                            <DragDropProvider/>
                        </Scheduler>
                    </Paper>
                </div>
            </SideBarMenu>
        </div>
    ) : null;
};

export default SchedulePage;
