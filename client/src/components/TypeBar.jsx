import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../index"
import TypeItem from './TypeItem';

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
        <div>
            {types.map(type => 
                <TypeItem 
                text={type.name} 
                onClick={() => product.setSelectedType(type)}
                active={type.id === product.selectedType.id}
                key={type.id}
                />
            )}
        </div>


        // <ListGroup>
        //     {types.map(type => 
        //         <ListGroup.Item
        //         style={{cursor: 'pointer'}} 
        //         active={type.id === product.selectedType.id}
        //         onClick={() => product.setSelectedType(type)}
        //             key={type.id}
        //         >
        //             {type.name}
        //         </ListGroup.Item>
        //         )}
        // </ListGroup>
    )
})

export default TypeBar