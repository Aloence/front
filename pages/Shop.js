import React, {useContext, useEffect, useState} from 'react';
import { Button, Col, Container, Form, Row,FormControl} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices} from "../http/deviceAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const [search,setSearch] = useState('')

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
        getDevices(null,'')
    }, [])

    useEffect(() => {
        getDevices(device.selectedBrand,search)
    }, [device.selectedBrand])

    const getDevices = (brand,search) => {
        if(brand == null){
            fetchDevices(null,search).then(data => device.setDevices(data))
        }else{
            fetchDevices(brand.id,search).then(data => {
                device.setDevices(data)
            })
        }
    }

    return (
        <Container >
            <Row >
                <Col >
                    <Form inline className="mb-2 mt-2 w-75 ">
                    <FormControl type="text" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Поиск'
                        className="mr-sm-2 flex-grow-1" 
                        />
                    <Button variant="outline-primary"
                         onClick={()=>{
                            getDevices(null,search)}}
                    >Найти</Button>
                    </Form>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
