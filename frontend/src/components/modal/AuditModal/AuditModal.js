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
                        <Typography>
                            <span className="label">Локация:</span> {audit.location}
                        </Typography>
                    </Box>
                    <Box className="auditInfo">
                        <Typography>
                            <span className="label">Активность:</span> {audit.activity}
                        </Typography>
                    </Box>
                    <Box className="auditInfo">
                        <Typography>
                            <span className="label">Соглашение:</span> {audit.agreement}
                        </Typography>
                    </Box>
                    <Box className="auditInfo">
                        <MdAccessTimeFilled className="dateTimeIcon"/>
                        <Typography>
                            <span
                                className="label">Заключительная встреча:</span> {audit.closingMeetingDate ? new Date(audit.closingMeetingDate).toLocaleDateString() : 'Не указана'}
                        </Typography>
                    </Box>
                    <Box className="auditInfo">
                        <MdAccessTimeFilled className="dateTimeIcon"/>
                        <Typography>
                            <span
                                className="label">Срок действия сертификата:</span> {audit.certificateExpirationDate ? new Date(audit.certificateExpirationDate).toLocaleDateString() : 'Не указана'}
                        </Typography>
                    </Box>
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