import React from 'react'
import { Container, Item } from './styled/BrandItem'

const BrandItem = (props) => {
    return (
        <Container>
            <Item
                onClick={props.onClick}
                active={props.active}
            >
                {props.text}
            </Item>
        </Container>
    )
}

export default BrandItem