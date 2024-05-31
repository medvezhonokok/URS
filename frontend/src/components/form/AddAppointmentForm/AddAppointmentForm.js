import React, {useState} from 'react';
import {TextField, Button, Box, Typography, Grid, Modal} from '@mui/material';
import {saveNewAppointment} from "../../../data/storage";

const AddAppointmentForm = ({}) => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [color, setColor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = {
            title,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            color
        };
        saveNewAppointment(newAppointment);
        setTitle('');
        setStartTime('');
        setEndTime('');
        setColor('');
        window.location.reload();
    };


    return (

        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="form" onSubmit={handleSubmit} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add New appointment
                </Typography>
                <Grid container spacing={2}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        id="dt"
                        label="Start Time"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                    <TextField
                        id="dt"
                        label="End Time"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                    <TextField
                        label="Color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                </Grid>
                <div className="modalFooter">
                    <Button className="companiesButton" type="submit">
                        Create new appointment
                    </Button>
                </div>
            </Box>

        </Modal>
    );

};

export default AddAppointmentForm;
