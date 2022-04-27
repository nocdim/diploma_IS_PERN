import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { Context } from "../index"

const BrandBar = observer(() => {
    const { product } = useContext(Context)
    
    let brands = []
    product.brands.forEach(brand => {
        brands.push(brand)
    })
    brands.sort((a, b) => {
        return 1 * String(a.id).localeCompare(String(b.id))
    })

    return (
        <div className="d-flex">
            {product.brands.map(brand => 
                    <Card
                        style={{cursor: 'pointer', margin: '1px'}}
                        key={brand.id}
                        className="p-3"
                        onClick={() => product.setSelectedBrand(brand)}
                        border={brand.id === product.selectedBrand.id ? 'primary' : 'seccondary'}
                    >
                        {brand.name}
                    </Card>
                )}
        </div>
    )
})

export default BrandBar