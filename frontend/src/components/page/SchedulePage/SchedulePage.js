import React, {useEffect, useState} from 'react';
import Select from 'react-select';
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
import './SchedulePage.css';
import {deleteAppointment, getAppointments, saveNewAppointment, updateAppointment} from "../../../data/storage";
import {Button} from "react-bootstrap";
import {Box, Grid, Modal, TextField, Typography} from "@mui/material";

// TODO: move to css
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

const options = [
    {value: 'red', label: 'Red'},
    {value: 'orange', label: 'Orange'},
    {value: 'blue', label: 'Blue'},
    {value: 'light-blue', label: 'Light blue'},
    {value: 'green', label: 'Green'},
]

const SchedulePage = ({user}) => {
    const [data, setData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [color, setColor] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getAppointments().then(
            appointmentsJson => {
                setData(appointmentsJson)
            }
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let newAppointment = {
            title: title,
            startTime: startTime,
            endTime: endTime,
            color: color
        };

        saveNewAppointment(newAppointment).then((_) => {
            setData((prevData) => {
                return [...(prevData), newAppointment];
            });

            handleClose();
            window.location.reload(); // TODO: научиться добавлять без перезагрузки страницы.
        });

        setTitle('');
        setStartTime('');
        setEndTime('');
        setColor('');
    };

    const commitChanges = ({_, changed, deleted}) => {
        setData((prevData) => {
            let newData = prevData;

            if (changed) {
                updateAppointment(changed).then(r => {
                    console.log("Appointment updated");
                });

                // TODO: чето странное, как будто можно проще, я не понимаю что тут происходит
                newData = newData.map(appointment => (
                    changed[appointment.id]
                        ? {...appointment, ...changed[appointment.id]}
                        : appointment));
            }

            if (deleted) {
                deleteAppointment(deleted).then(r => {
                    console.log("Appointment deleted.")
                });
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
                <div className="schedule-page">
                    <div className="companiesPageHeader">
                        <h1 className="companiesHeader">Schedule</h1>
                        <div className="companiesAddNewCompanyButton">
                            <Button onClick={handleOpen}><h1>NEW +</h1></Button>
                            <Modal open={open}
                                   onClose={handleClose}
                                   aria-labelledby="modal-modal-title"
                                   aria-describedby="modal-modal-description">
                                <Box component="form" onSubmit={handleSubmit} sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add New Appointment
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth
                                                       label="Title"
                                                       value={title}
                                                       onChange={(e) => setTitle(e.target.value)}
                                                       required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth
                                                       id="dt"
                                                       label="Start Time"
                                                       type="datetime-local"
                                                       value={startTime ? startTime : new Date()}
                                                       onChange={(e) => setStartTime(e.target.value)}
                                                       required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth
                                                       id="dt"
                                                       label="End Time"
                                                       type="datetime-local"
                                                       value={endTime ? endTime : new Date()}
                                                       onChange={(e) => setEndTime(e.target.value)}
                                                       required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Select unstyled={false}
                                                    defaultValue={options[1]}
                                                    options={options}
                                                    onChange={(e) => {
                                                        setColor(e.value ? e.value : options[1].value);
                                                    }}
                                                    required
                                            />
                                        </Grid>
                                    </Grid>
                                    <div className="modalFooter">
                                        <Button className="companiesButton" onClick={handleClose}>Close</Button>
                                        <Button className="companiesButton" type="submit">Create new
                                            appointment</Button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                    <Paper>
                        <Scheduler data={data} height={660}>
                            <ViewState currentDate={currentDate} onCurrentDateChange={(date) => setCurrentDate(date)}/>
                            <EditingState onCommitChanges={commitChanges}/>
                            <IntegratedEditing/>
                            <WeekView startDayHour={0} endDayHour={24}/>
                            <Toolbar/>
                            <DateNavigator/>
                            <TodayButton/>
                            <Appointments appointmentComponent={appointmentComponent}/>
                            <AppointmentTooltip showDeleteButton/>
                            <DragDropProvider/>
                        </Scheduler>
                    </Paper>
                </div>
            </SideBarMenu>
        </div>
    ) : null;
};

export default SchedulePage;
