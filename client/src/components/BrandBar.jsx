import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { Context } from "../index"

const BrandBar = observer(() => {
    const { product } = useContext(Context)
    return (
        <div className="d-flex">
            {product.brands.map(brand => 
                    <Card
                    style={{cursor: 'pointer'}}
                        key={brand.id}
                        className="p-3"
                        onClick={() => product.setSelectedBrand(brand)}
                        border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
                    >
                        {brand.name}
                    </Card>
                )}
        </div>
    )
})

export default BrandBar