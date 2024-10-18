import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    const changeBorder = (id)=>{
        if (device.selectedBrand == null){
            return ''
        }
        return id === device.selectedBrand.id ? 'danger' : ''
    }
    
    return (
        <Row className="d-flex ml-0">
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border = {changeBorder(brand.id)}
                >
                    {brand.name}
                </Card>
            )}
           <Card
                    style={{cursor:'pointer',backgroundColor:"grey",color :"white"}}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(null)}
                    background-color = "black"
                >
                    Сбросить
            </Card> 
        </Row>
    );
});

export default BrandBar;
