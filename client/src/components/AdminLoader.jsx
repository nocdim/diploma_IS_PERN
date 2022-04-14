import React from 'react';
import { Spinner } from 'react-bootstrap'

const AdminLoader = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'space-between',
            alignItems: 'center',
            overflow: 'auto'
        }}>
            <Spinner animation={"border"} />
        </div>
    )
}

export default AdminLoader