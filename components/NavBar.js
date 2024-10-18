import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink,useHistory} from "react-router-dom";
import { Button, Container} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {basket}= useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem("auth","false")
        localStorage.setItem("basket","[]")
        basket.setDevices([])
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>КупиТелефон</NavLink>
                {user.isAuth ? user.role ?
                    <Nav className="ml-0" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button
                        variant={"outline-light"}
                        onClick={() => history.push(BASKET_ROUTE)}
                    >
                        Корзина
                    </Button>
                    <Button
                        variant={"outline-light"}
                        onClick={() => logOut()}
                        className="ml-2"
                    >
                        Выйти
                    </Button>
                </Nav>

                    :
                    <Nav className="ml-0" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
