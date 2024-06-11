import React from 'react';
import './CertificationSchemePage.css';
import {AuditCriterion} from "../../../data/storage";

const CertificationSchemePage = ({user}) => {
    const handleImageClick = () => {
        const img = document.querySelector('.certificatesPageContainer img');
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } else if (img.mozRequestFullScreen) {
            img.mozRequestFullScreen();
        } else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen();
        } else if (img.msRequestFullscreen) {
            img.msRequestFullscreen();
        }
    };

    return (
        user ?
            <div className="usersPageContainer">
                <h1 className="companiesHeader">Схемы сертификации</h1>
                <div className="certificatesPageContainer">
                    <ul>
                        {AuditCriterion.map((certificateType, index) => (
                            <li key={index} style={{color: "black", textAlign: "left"}}>{certificateType.value}</li>
                        ))}
                    </ul>
                    <h1 className="companiesHeader">Статистика по схемам сертификации</h1>
                    <img src={'certification_scheme.jpg'} alt="Certification Scheme" onClick={handleImageClick}/>
                </div>
            </div>
            : null
    );
};

export default CertificationSchemePage;
