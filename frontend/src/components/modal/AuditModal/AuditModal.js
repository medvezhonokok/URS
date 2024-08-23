import React from 'react';
import {Box, Popover, Typography} from '@mui/material';
import {MdAccessTimeFilled} from 'react-icons/md';
import './AuditModal.css';

const AuditModal = ({open, anchorEl, onClose, audit}) => {
    if (!audit) return null;

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            PaperProps={{
                style: {
                    borderRadius: '1rem',
                },
            }}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box className="popover-content">
                <Typography variant="h6">Аудирование "{audit.companyName}"</Typography>
                <Box className="auditInfoContainer">
                    <Box className="auditInfo">
                        <MdAccessTimeFilled className="dateTimeIcon"/>
                        <Typography>
                            {new Date(audit.startDate).toLocaleDateString()} - {new Date(audit.endDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Popover>
    );
};

export default AuditModal;