import {Button, Dropdown,Form, Row, Col, Modal} from "react-bootstrap";
import { editDevice, fetchOneDevice ,fetchBrands} from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import {Context} from "../../index";

const EditForm = observer(({show, onHide,id})=>{
    const {device} = useContext(Context)

    const [selectedDevice, setSelectedDevice] = useState({characteristics: [],brand:{}})
    const [info,setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState('')
    const [brand,setBrand] = useState({})

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
    },[])

    useEffect(() => {
        if(id!=null){
            fetchOneDevice(id).then((data)=> {
                setSelectedDevice(data)
                setName(data.name)
                setPrice(data.price)
                setFile(data.img)
                setBrand(data.brand)
                setInfo(data.characteristics)
            }
        )}
    }, [id])

    if(id ==null) return null

    const addInfo = (title, description, id) => {
        setInfo([...info, {title: title, description: description, id: id}])
    }
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id))
    }
    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

   

    const changeDevice = () => {
        console.log(id)
        let devInfo = []
        info.map(i =>devInfo.push({"title":i.title, "description":i.description}))
        const data = {
            "name":name,
            "img":file,
            "price": price,
            "brand": {
                "id":brand.id
            },
            "characteristics":devInfo
        }
        const json = JSON.stringify(data)
        
        data.brand = {
            "name":brand.name,
            "id":brand.id
        }
        device.changeDev(id,data)
        
        editDevice(id,json).then(d =>{
            onHide()
        })
        
    }

    
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <Form >
        <Dropdown className="mt-2 mb-2" >
            <Dropdown.Toggle>{brand.name|| "Выберите бренд"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.brands.map(b =>
                    <Dropdown.Item
                        onClick={() => {
                            setBrand(b)
                        }}
                        key={b.id}
                    >
                        {b.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder={name}
        />
        <Form.Control
            onChange={e => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder={price}
        />
        <Form.Control
            onChange={e => setFile(e.target.value)}
            className="mt-3"
            placeholder={selectedDevice.img}
        />
        <hr/>
        <Button
            variant={"outline-dark"}
            onClick={()=>{
                addInfo('','',Date.now())}}

        >
            Добавить новое свойство
        </Button>
        {info.map(i =>
            <Row className="mt-4" key = {i.id}>
                <Col md={4}>
                    <Form.Control
                        value={i.title}
                        onChange={(e) => changeInfo('title', e.target.value, i.id)}
                        placeholder="Введите название свойства"
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        value={i.description}
                        onChange={(e) => changeInfo('description', e.target.value, i.id)}
                        placeholder="Введите описание свойства"
                    />
                </Col>
                <Col md={4}>
                    <Button
                        onClick={() => removeInfo(i.id)}
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
                <Button variant="outline-success" onClick={changeDevice}>Редактировать</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default EditForm