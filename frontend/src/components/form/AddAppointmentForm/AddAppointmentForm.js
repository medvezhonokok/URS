import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';
import {saveNewAppointment} from "../../../data/storage";

const AddAppointmentForm = ({}) => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = {
            title,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        };
        saveNewAppointment(newAppointment);
        setTitle('');
        setStartTime('');
        setEndTime('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Start Time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <TextField
                label="End Time"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">Add Appointment</Button>
        </form>
    );
};

export default AddAppointmentForm;
