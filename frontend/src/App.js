import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import * as index from "./index";
import * as storage from "./data/storage";
import SideBarMenu from "./components/SideBarMenu/SideBarMenu";

const App = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompany] = useState(null);
    const user = index.getUser();

    useEffect(() => {
        storage.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson)
            }
        );
    }, []);

    const showCompanyInfoByCompanyId = (companyId) => {
        setSelectedCompany(selectedCompanyId === companyId ? null : companyId);
    };

    const getInProcessCompanies = companies
        .filter(company => company.inProcess)
        .map(company => (
            <div className="companyBox" key={company.id} onClick={() => showCompanyInfoByCompanyId(company.id)}>
                <div>
                    <h3>{company.companyName}</h3>
                    {company.certificate ? (
                        <>
                            <p>Certificate type: {company.certificate.certificateType}</p>
                            <p>Certificate number: {company.certificate.certificateNumber}</p>
                        </>
                    ) : (
                        <p>У компании нет сертификата</p>
                    )}
                    {selectedCompanyId === company.id && (
                        <div>
                            <p>About: {company.about}</p>
                        </div>
                    )}
                </div>
            </div>
        ));

    const getNotInProcessCompanies = companies
        .filter(company => !company.inProcess)
        .map(company => (
            <div className="companyBox" key={company.id} onClick={() => showCompanyInfoByCompanyId(company.id)}>
                <div>
                    <h3>{company.companyName}</h3>
                    {company.certificate ? (
                        <>
                            <p>Certificate type: {company.certificate.certificateType}</p>
                            <p>Certificate number: {company.certificate.certificateNumber}</p>
                        </>
                    ) : (
                        <p>У компании нет сертификата</p>
                    )}
                    {selectedCompanyId === company.id && (
                        <div>
                            <p>About: {company.about}</p>
                        </div>
                    )}
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat tristique lacus sed tempus. Proin ac ligula ut erat commodo elementum. Curabitur arcu leo, commodo vitae iaculis id, blandit non libero. Donec efficitur diam et interdum scelerisque. Nullam pulvinar libero quis volutpat bibendum. In varius ut dolor non condimentum. Proin placerat neque nec risus egestas, vel facilisis lorem imperdiet. Cras quis urna egestas, commodo sapien sit amet, imperdiet leo. Sed luctus id justo ut dapibus. Sed elementum lacus dapibus mauris sollicitudin eleifend. Fusce eu pharetra quam. Vestibulum maximus libero nec metus molestie, non dictum arcu vestibulum.

Integer vitae neque eleifend ante interdum egestas et nec leo. Sed congue quam ipsum, non iaculis nibh bibendum a. In enim enim, commodo at mauris at, gravida accumsan sapien. Quisque mattis neque eget nisi euismod, in rutrum ligula pharetra. Donec mauris justo, luctus vitae semper scelerisque, ullamcorper ac metus. Sed eleifend tortor turpis, ut placerat metus ornare et. Nulla vel mauris quis nisl tincidunt varius. Morbi sit amet libero eget erat aliquam aliquam quis et orci. Integer consequat sapien eu odio ultrices, sed mollis est ultricies. Proin ac odio arcu. Ut ultricies libero sed mollis dignissim. Aliquam egestas consectetur elementum. Cras nec ultrices leo, ac consectetur purus. Duis ut felis quis nibh molestie laoreet. Aenean nec sapien ac erat rutrum congue. Donec pulvinar ligula euismod velit efficitur vulputate.

Sed sed pretium quam. Proin consectetur hendrerit augue, ut iaculis enim pulvinar ut. Praesent pretium facilisis bibendum. In vestibulum, purus non laoreet tincidunt, arcu libero congue nulla, eget pretium felis dui vitae enim. Nam bibendum eros nec eros varius, a molestie nunc luctus. Donec lectus magna, aliquam vitae rhoncus mattis, maximus non risus. Integer vel orci et urna semper commodo. Donec posuere at ligula a aliquam. Nunc facilisis posuere pulvinar. Nunc ac mollis risus. Maecenas dignissim purus non sapien consequat feugiat. Phasellus quis condimentum enim.

In a vestibulum diam, ut dignissim lacus. Nulla tortor erat, consequat ut feugiat a, semper at ante. Cras feugiat nisi interdum arcu accumsan sagittis. Quisque gravida nunc eros, eu lobortis lectus egestas id. Curabitur semper, ipsum at convallis tristique, purus nisi tincidunt ipsum, vel congue mi arcu ac tortor. Vivamus bibendum mollis ante, condimentum fringilla arcu egestas at. Nullam nec facilisis lorem. Nulla tempus nunc nunc, nec tempor eros tempor ut. Etiam varius justo et interdum pretium. Pellentesque non nisi luctus, congue leo nec, mattis libero. Maecenas posuere eu augue commodo fringilla. Sed eget semper nisl, in sollicitudin massa. Fusce vulputate ultricies nisl, et maximus lorem consequat quis. Nullam et mi libero. Fusce et justo eget neque luctus tempus vitae a felis.</div>
            </div>
        ));

    const userCeoContent =
        <div className="App">
            <div>
                <SideBarMenu user={user}/>
                    <div className="userCard">
                        <h3>COMPANIES</h3>
                        <h2>IN PROCESS</h2>
                        {getInProcessCompanies}
                        <h2>NOT IN PROCESS</h2>
                        {getNotInProcessCompanies}
                    </div>
            </div>
        </div>;

    const userDefaultWorkerContent =
        <div className="App">
            <div>
                <SideBarMenu user={user}/>
                <div style={{display: "flex", paddingTop: "5rem"}}>
                    <div className="borderedBox companies">
                        <h3>COMPANIES</h3>
                        <h2>IN PROCESS</h2>
                        {getInProcessCompanies}
                    </div>
                    <div className="borderedBox companies">
                        <h3>COMPANIES</h3>
                        <h2>NOT IN PROCESS</h2>
                        {getNotInProcessCompanies}
                    </div>
                </div>
            </div>
        </div>;

    return user ? user.userRole === "CEO" ? userCeoContent : userDefaultWorkerContent : <LoginForm/>;
};

export default App;
