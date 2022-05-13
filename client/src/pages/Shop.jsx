import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import Pages from "../components/Pages"
import useFetchInfo from '../hooks/useFetchInfo'
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react'
import { Search } from '../components/styled/Shop'
import { useNavigate } from 'react-router-dom'
import { SEARCH_ROUTE } from '../utils/consts'

const Shop = observer(() => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    useFetchInfo()

    const searchValue = async (param) => {
        try {
            localStorage.setItem('search', param)
            navigate(SEARCH_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container style={{ maxWidth: '80%' }}>
            <Row className="pt-3">
                <Search>
                    <input
                        value={search}
                        placeholder="Поиск продуктов..."
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => searchValue(search)}
                    ><Icon.Search /></button>
                </Search>
            </Row>
            <Row className="pt-2">
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={8}>
                    <div style={{marginLeft: '27px'}}>
                        <ProductList />
                        <Pages />
                    </div>
                </Col>
                <Col md={2}>
                    <BrandBar />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop