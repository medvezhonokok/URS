import React from 'react';
import './AccreditationPage.css';
import {AuditCriterion} from "../../../constants/constants";
import {Button, List, ListItem} from "@mui/material";

const AccreditationPage = ({user}) => {
    const userAvailableAuditCriterion = user.certificates.split('#')
        .map((cert, index) => cert === '1' ? AuditCriterion[index].value : null)
        .filter(cert => cert !== null);

    const missingCriteria = AuditCriterion.filter(criterion =>
        !userAvailableAuditCriterion.includes(criterion.value)
    );

    return (
        <>
            <div className="commonPageHeader">
                <h1 className="commonPageHeader">Ваша текущая аккредитация</h1>
            </div>
            <div className="accreditation-container">
                <List style={{width: "100%"}}>
                    {userAvailableAuditCriterion.map((certificate, index) => (
                        <ListItem className="accreditation-item" key={index}>
                            {certificate}
                        </ListItem>
                    ))}
                </List>
                <div className="missing-criteria-container">
                    {missingCriteria.length > 0 && (
                        <>
                            <div className="commonPageHeader">
                                <h1 className="commonPageHeader">Недостающие аккредитации</h1>
                            </div>
                            <List style={{width: "100%"}}>
                                {missingCriteria.map((criterion, index) => (
                                    <ListItem className="accreditation-item" key={index}>
                                        {criterion.value}
                                        <div className="request-button-wrapper">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="request-button"
                                                onClick={() => alert(`Запрос на получение аккредитации ${criterion.value}`)}
                                            >
                                                Запросить
                                            </Button>
                                        </div>
                                    </ListItem>
                                ))}

                            </List>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AccreditationPage;
