import React from 'react'
import { Container, Item } from './styled/TypeItem'

const TypeItem = (props) => {
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

export default TypeItem

