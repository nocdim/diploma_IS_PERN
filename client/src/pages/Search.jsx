import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import AdminLoader from '../components/AdminLoader'
import ProductItem from '../components/ProductItem'
import { makeSearch } from '../http/productAPI'
import { Context } from '../index'

const Search = () => {
  const { product } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    makeSearch(localStorage.getItem('search')).then(data => product.setSearchedProducts(data)).finally(() => setLoading(false))
  }, [product])


  if (loading) {
    return (
      <AdminLoader />
    )
  }

  if (product.searchedProducts.length === 0) {
    return (
      <Empty>
        <Spinner
          style={{ margin: '30px' }}
          animation="grow" /> Ничего не найдено! <Spinner
          style={{ margin: '30px' }}
          animation="grow" />
      </Empty>
    )
  }

  return (
    <Container style={{ maxWidth: '1100px' }}>
      <Row>
        <Header><h2>Результаты поиска:</h2></Header>
      </Row>
      <hr />
        <Row style={{ marginLeft: '27px', display: 'inline-flex' }}>
        {product.searchedProducts.map(prdct =>
          <ProductItem key={prdct.id} product={prdct} />
        )}
      </Row>
    </Container >
  )
}

const Empty = styled.div`
    width: 100%;
    height: calc(100vh - 72.8px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 44px;
`

const Header = styled.div`
    display: flex; 
    justify-content: center;
    margin-top: 1rem;
`

export default Search