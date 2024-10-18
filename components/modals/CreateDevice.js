import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState('')
    const [info, setInfo] = useState([])
    const [brand,setBrand] = useState({})

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    
    
    const addDevice = () => {
        if (Object.keys(brand).length == 0) {
            alert("Выберите бренд")
            return
        }
        if( isNaN(Number(price))){
            alert("Введите цену правильно")
            return
        }
        let devInfo = []
        info.map(i =>devInfo.push({"title":i.title, "description":i.description}))
        const data = {
            "name":name,
            "img":file,
            "price": Number(price),
            "brand": {
                "id":brand.id
            },
            "characteristics":devInfo
        }
        const json = JSON.stringify(data)
        

        createDevice(json).then(dk => {
            fetchDevices(null,'').then(data => device.setDevices(data))
            onHide()})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Dropdown className="mt-2 mb-2" >
                        <Dropdown.Toggle>{brand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => setBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                    />
                    <Form.Control
                        value={file}
                        onChange={e => setFile(e.target.value)}
                        className="mt-3"
                        placeholder="Введите ссылку на изображение"
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key = {i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
