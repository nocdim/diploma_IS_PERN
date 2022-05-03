const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// Сущности БД
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING, 
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING, 
        defaultValue: 'USER'
    }
})

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
})

const BasketProduct = sequelize.define('basket_product', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    price: {
        type: DataTypes.FLOAT, 
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT, 
        defaultValue: 0
    },
    img: {
        type: DataTypes.STRING, 
        allowNull: false
    }
})

const Type = sequelize.define('type', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    }
})

const Brand = sequelize.define('brand', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
})

const Rating = sequelize.define('rating', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    rate: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
})

const ProductInfo = sequelize.define('product_info', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: {
        type: DataTypes.STRING, 
        allowNull: false
    },
})

const TypeBrand = sequelize.define('type_brand', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
})

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    products: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    payType: {
        type: DataTypes.STRING, 
        allowNull: false
    }
})

// Описываем связи
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })
Product.belongsTo(Type, { onDelete: "CASCADE", onUpdate: "CASCADE" })

Brand.hasMany(Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })
Product.belongsTo(Brand, { onDelete: "CASCADE", onUpdate: "CASCADE" })

Product.hasMany(Rating, { onDelete: "CASCADE", onUpdate: "CASCADE" })
Rating.belongsTo(Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })

Product.hasMany(BasketProduct, { onDelete: "CASCADE", onUpdate: "CASCADE" })
BasketProduct.belongsTo(Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })

Product.hasMany(ProductInfo, {as: 'info', onDelete: "CASCADE", onUpdate: "CASCADE"})
ProductInfo.belongsTo(Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })

// Связь многие ко многим
Type.belongsToMany(Brand, {through: 'type_brand', onDelete: "CASCADE", onUpdate: "CASCADE"})
Brand.belongsToMany(Type, {through: 'type_brand', onDelete: "CASCADE", onUpdate: "CASCADE"})

// Синхронизируем все сущности нашей БД
sequelize.sync({alter: true})

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ProductInfo
}

