require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const associations = require('./entities/associations')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3333

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)


// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate() // устанавливаем подключение к БД
        app.listen(PORT, () => {
            console.log(`Server has been launched on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
