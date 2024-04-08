import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import * as index from "./index";
import {Button} from "react-bootstrap";
import BottomNavigationBar from "./components/BottomNavigationBar/BottomNavigationBar";
import TopNavigationBar from "./components/TopNavigationBar/TopNavigationBar";

const App = () => {
    const user = index.getUser();

    return (
        user
            ? (<div className="App">
                <div>
                    <TopNavigationBar user={user}/>
                    <Button onClick={() => index.logout()}>Log out</Button>
                    <BottomNavigationBar user={user}/>
                </div>
            </div>)
            : (<LoginForm/>)
    );
}

export default App;
