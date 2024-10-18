import React,{useContext, useState} from 'react';
import { Col, Container, Row,Button,Form} from "react-bootstrap";
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('') 

    const getSum =() =>{
        let sum = 0
        basket.devices.map(i =>sum+=i.price)
        return sum
    }

    const createOrder = () =>{
        if(name && phone){
            alert("Заказ успешно оформлен")
        }else{
            alert("Введите свои данные")
        }
    }

    const removeProduct = (index) => {
      basket.delDevice(index)
    }

    const sum = getSum()

    return (
        <Container >
            {!basket.devices.length ?
                <Row className="d-flex flex-column m-3 text-center">
                <h2>Корзина пуста</h2>
                </Row>
            :
            <Container >
            <Row className="d-flex flex-column m-3 text-center">
                <h2>Корзина</h2>
            </Row>
            <Row>
            <Col md={8}>
                <h5>Название</h5>
             </Col>
            <Col md={2}>
                
            </Col>
            <Col md={2}>
                <h5>Цена</h5>
            </Col> 
            </Row>
            {basket.devices.map((i,index) =>
                <Row key={i.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                    <Col md={8}>
                        {i.name}
                    </Col>
                    <Col md={2}>
                        <Button
                            onClick={() => {
                                removeProduct(index)
                            }}
                            variant={"outline-danger"}
                        >
                            Удалить
                        </Button>
                    </Col> 
                    <Col md={2}>
                        {i.price}
                    </Col>
                   
                </Row>
            )}
            <Row className="mt-3">
                <Col md={10}>
                    <h5>Общая стоимость корзины </h5>
                </Col>
                <Col md={2}>
                    <h5>{sum}р</h5>
                </Col>
            </Row>
            
            <Row className="d-flex flex-column mt-3 text-center" >
                <h3>Оформление заказа</h3>
            </Row>
            <Row>
                <Form.Control
                    onChange={e => setName(e.target.value)}
                    className="mt-3"
                    placeholder="Введите ваше ФИО"
                />
                <Form.Control
                    onChange={e => setPhone(e.target.value)}
                    className="mt-3"
                    placeholder="Введите номер телефона "
                />
                <hr/>
                <Button 
                    className="mt-3" 
                    variant={"outline-success"}
                    onClick={createOrder}
                >
                    Оформить заказ
                </Button>
            </Row>
            </Container>
            }
        </Container>
    );
});

export default Basket;
