import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { registrationAdmin } from '../../http/userAPI'

const CreateAdmin = ({ show, onHide }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const addAdmin = async () => {
        let role
        try {
            const data = await registrationAdmin(name, password, confirmPass, role = 'ADMIN')
            window.location.reload()
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить администратора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <Form style={{ width: '450px' }}>
                    <Form.Control
                        className="my-3"
                        placeholder="Введите логин сотрудника..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="my-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="my-3"
                        placeholder="Подтвердите пароль..."
                        value={confirmPass}
                        onChange={e => setConfirmPass(e.target.value)}
                        type="password"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAdmin}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateAdmin