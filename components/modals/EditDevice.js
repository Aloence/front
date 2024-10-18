import React, {useContext, useEffect,useState} from 'react';
import {Button,Container, Row, Col,Image} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import { deleteDevice, fetchBrands, fetchDevices } from '../../http/deviceAPI';
import EditForm from './EditDeviceForm';

const EditDevice = observer(() => {
    const {device} = useContext(Context)
    const [formVisible,setFormVisible] = useState(false)
    const [id,setId] = useState(device.devices.length? device.devices[0].id:null)

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null,'').then(data => device.setDevices(data))
    }, [])

    const removeDevice = (id,index) =>{
        deleteDevice(id)
        device.deleteDev(index)
    }
    
    const editDevice = (id) =>{
       setId(id)
       setFormVisible(true)
    }

    return (
        <Container>
            {device.devices.map((device,index)=>
            <Row key={device.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
        
                <Col md ={4}>
                <Image width={200} height={200} src={device.img}/>
                </Col>
                <Col md ={6} className='mt-4'>
                    <Row><h5>Название : {device.name}</h5></Row>
                    <Row><h5>Бренд : {device.brand.name}</h5></Row>
                    <Row><h5>Цена : {device.price}</h5></Row>
                    
                </Col>
                <Col md ={2} className='mt-4'>
                    <Row>
                        <Button 
                            onClick={()=>{removeDevice(device.id,index)}}
                            className='btn-block'
                            variant={"outline-danger"}
                        >
                        Удалить
                        </Button>
                </Row>
                <Row>
                <Button
                    onClick={()=>{
                        editDevice(device.id)
                        }
                    }
                    className='btn-block mt-4'
                    variant={"outline-success"}

                >
                    Редактировать
                </Button>
                </Row>
                </Col>
            </Row>)}
            <EditForm id ={id} show={formVisible} onHide={() => setFormVisible(false)}/>
        </Container>
    )
})

export default EditDevice