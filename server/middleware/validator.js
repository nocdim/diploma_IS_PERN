const { check } = require('express-validator')

exports.login = [
    check('email', 'Поле "email" пустое')
        .exists()
        .isLength({ min: 1 }),
    check('password', 'Поле "пароль" пустое')
        .exists()
        .isLength({ min: 1 })
]

exports.registration = [ // вывод данных о регистрации в объекте
    check('email', 'Введен неккоректный email')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Пароль должен состоять из 8+ символов')
        .exists()
        .isLength({ min: 8 }),
    check('confirmPass', 'Пароли не совпадают')
        .custom((value, { req }) => (value === req.body.password))
]