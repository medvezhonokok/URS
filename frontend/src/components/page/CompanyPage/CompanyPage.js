import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as constants from "../../../constants/constants";
import * as index from "../../../index";
import axios from "axios";
import './CompanyPage.css';
import SideBarMenu from "../../SideBarMenu/SideBarMenu";

const CompanyPage = () => {
    const user = index.getUser();

    const [company, setCompany] = useState(null);
    const {companyId} = useParams();
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (user && companyId && jwtToken) {
            axios.post(constants.BACKEND_JAVA_URL + `/company/get_by_id?companyIdString=${companyId}&jwt=${jwtToken}`)
                .then(response => {
                    setCompany(response.data)
                }).catch(err => {
                console.log("Failed to get company: " + err)
            });
        }
    }, [user, companyId, jwtToken]);


    if (!user || !companyId || !jwtToken) {
        return null;
    }

    return (
        <div>
            {company ? (
                <>
                    <SideBarMenu user={user} children={
                        <div className="companyContainer" style={{width: "80%"}}>
                            <h1>{company.companyName}</h1>
                            <p>EAST/WEST</p>
                            <p>ID</p>
                            <p>Наименование организации (ENG)</p>
                            <p>Наименование организации (RU)</p>
                            <p>Критерий сертификации</p>
                            <p>Страна</p>
                            <p>Кто планирует и проводит</p>
                            <p>АДМ</p>
                            <p>IATF №</p>
                            <p>Issue</p>
                            <p>Expire</p>
                            <p>Дата заключительного совещания</p>
                        </div>
                    }/>
                </>
            ) : (
                <p>No such company</p>
            )}
        </div>
    );
};

export default CompanyPage;
