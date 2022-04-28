import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import CreateAdmin from '../components/modals/CreateAdmin'
import { Context } from '../index'
import * as Icon from 'react-bootstrap-icons'
import { deleteAdmin } from '../http/userAPI'

const AdminInfo = observer(() => {
    const { user } = useContext(Context)
    const [adminVisible, setAdminVisible] = useState(false)

    const removeAdmin = async (name) => {
        try {
            await deleteAdmin({ name: name }).then(
                alert(`Администратор '${name}' был успешно удален`)
            ).finally(window.location.reload())
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <Row>
                <Col className="d-flex flex-column" md={{ span: 3 }}>
                    <Button
                        variant={"outline-primary"}
                        className="mt-4 p-2"
                        onClick={() => setAdminVisible(true)}
                    >
                        Добавить администратора <Icon.Wrench />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex flex-column mt-4" >
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Имя администратора
                                </th>
                                <th>Дата регистрации</th>
                                <th>Опции</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.admins.map(admin =>
                                <tr
                                    md="auto"
                                    key={admin.id}
                                >
                                    <th style={{ width: '10%' }}>
                                        {admin.id}
                                    </th>
                                    <th style={{ width: '35%' }}>
                                        {admin.email}
                                    </th>
                                    <th style={{ width: '35%' }}>
                                        {admin.createdAt.substr(0, 10)}
                                    </th>
                                    <th>
                                        <Row>
                                            <Col className="d-grid">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (window.confirm(`Вы действительно хотите удалить администратора '${admin.email}'?`)) {
                                                            removeAdmin(admin.email)
                                                        }
                                                    }}
                                                >
                                                    Удалить <Icon.Trash3 />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <CreateAdmin show={adminVisible} onHide={() => setAdminVisible(false)} />
        </div>
    )
})

export default AdminInfo