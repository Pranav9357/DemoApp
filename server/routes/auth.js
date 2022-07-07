const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const authenticate = require('../utils/authenticate')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/allUser', authenticate, AuthController.getAll)

module.exports = router