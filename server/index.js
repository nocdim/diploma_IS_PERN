require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

const PORT = process.env.PORT || 3333

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate() // устанавливаем подключение к БД
        await sequelize.sync() // сверяем состояние БД со схемой данных
        app.listen(PORT, () => {
            console.log(`Server has been launched on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
