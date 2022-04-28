import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from "../index"
import BrandItem from './BrandItem';

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
        <div>
            {brands.map(brand =>
                <BrandItem
                    text={brand.name}
                    onClick={() => product.setSelectedBrand(brand)}
                    active={brand.id === product.selectedBrand.id}
                    key={brand.id}
                />
            )}
        </div>
    )
})

export default BrandBar