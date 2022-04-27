import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../index"
import { ListGroup } from "react-bootstrap"

const TypeBar = observer(() => {
    const { product } = useContext(Context)
    let types = []
    product.types.forEach(type => {
        types.push(type)
    })
    types.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })
    return (
        <ListGroup>
            {types.map(type => 
                <ListGroup.Item
                style={{cursor: 'pointer'}} 
                active={type.id === product.selectedType.id}
                onClick={() => product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
                )}
        </ListGroup>
    )
})

export default TypeBar