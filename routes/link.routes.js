const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.post(
    '/generate',
    auth,
    async (req, res) => {
        try {
            const baseUrl = config.get('baseUrl')
            const {from} = req.body
            const code = shortid.generate()

            const exists = await Link.findOne({from})
            if (exists) {
                return res.json({link: exists})
            }

            const to = baseUrl + '/t/' + code

            const link = new Link({
                code, to, from, owner: req.user.userId
            })

            await link.save()

            res.status(201).json({link})

        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    })

router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const links = await Link.find({owner: req.user.userId})
            res.json(links)
        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    })

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id)
            res.json(link)
        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    })

module.exports = router