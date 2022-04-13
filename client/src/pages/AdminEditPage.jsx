import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

const AdminEditPage = () => {
    let {type} = useParams()
    console.log(type)
    return (
        <Container>
            {type === 'brand' 
            ? <h1>АЛОООООООООООООООООООООООО</h1>
            : <h1>{type}</h1>
            }
            
        </Container>
    )
}

export default AdminEditPage