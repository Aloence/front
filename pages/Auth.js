import React, {useContext, useState} from 'react';
import {Container, Form, Card, Row, Button} from "react-bootstrap";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";

const Auth = observer(() => {
    const {user} = useContext(Context)

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authorize = async () => {
        try {
            let role
            if (isLogin) {
                role = await login(username, password)
            } else {
                role = await registration(username, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            localStorage.setItem("auth","true")

            user.setRole(role)
            if(role){
                localStorage.setItem("role","true")
            }else{
                localStorage.setItem("role","false")
            }
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={authorize}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                    
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
