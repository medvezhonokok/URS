import React from 'react';
import './StatisticsPage.css';

const StatisticsPage = ({user}) => {
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
                <h1 className="companiesHeader">Статистика</h1>
                <div className="certificatesPageContainer">
                    <img src={'certification_scheme.jpg'} alt="Certification Scheme" onClick={handleImageClick}/>
                </div>
            </div>
            : null
    );
};

export default StatisticsPage;
