require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 3333

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

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
