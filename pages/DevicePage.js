import React, {useEffect, useState,useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import { Context } from '..';

const DevicePage = () => {
    const {basket} = useContext(Context)
    const [device, setDevice] = useState({characteristics: []})
    const {user} = useContext(Context)
    
    const {id} = useParams()
    const checkBrand = () =>{
        if(device.brand === undefined)
            return ""
        return device.brand.name
    }

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    
    const addToCart = ()=>{ 
        device.id = basket.devices.length
        basket.addDevice(device)
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={8}>
                    <Image width={600} height={600} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 600, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <Row className='text-center'><h2>{device.name}</h2></Row>
                        <h2>{checkBrand()}</h2>
                        <h3>Цена: {device.price} руб.</h3>
                        {user.isAuth ?
                            <Button 
                                variant={"primary"}
                                onClick={addToCart}
                            >Добавить в корзину</Button>
                        :
                        <Row></Row>
                        }
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.characteristics.map((info, index) =>
                    <Row key={info.id}>
                        <Col style={{background: index % 2 === 0 ? 'lightgray' : 'transparent'}}>
                            {info.title}
                        </Col>
                        <Col style={{background: index % 2 === 0 ? 'transparent' : 'lightgray'}}>
                             {info.description}
                        </Col>
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
