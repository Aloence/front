import React, {useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import EditDevice from '../components/modals/EditDevice';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <Row className='flex-column mt-4 p-2 text-center'> <h2>Список устройств </h2> </Row>   
            <EditDevice/>
        </Container>
    );
};

export default Admin;
