import React, {useContext, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";

const App = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    useEffect(()=>{
        if(localStorage.getItem("auth")==="true"){
            if(localStorage.getItem("role")==="true")
                user.setRole(true)
            user.setIsAuth(true)
            basket.setDevices(JSON.parse(localStorage.getItem("basket")))
        }
        
    },[])
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
