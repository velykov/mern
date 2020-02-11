const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router();

// api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            console.log('Body: ', req.bodyloginHand)

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при регистрации'
                })
            }

            const {
                email,
                password
            } = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hash = await bcrypt.hash(password, 12)
            const user = new User({email, password: hash})

            await user.save()

            res.status(200).json({message: 'Пользователь создан'})
        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    })

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите коректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        console.log('Body:', req.body)
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при входе в систему'
                })
            }

            const {
                email,
                password
            } = req.body
            const candidate = await User.findOne({email})
            if (!candidate) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, candidate.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const {id: userId} = candidate;

            const token = jwt.sign(
                {userId},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId})
        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    })

module.exports = router