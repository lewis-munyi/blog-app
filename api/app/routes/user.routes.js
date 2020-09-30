const { Router } = require('express')
const user = require('../controllers/user.controller.js')
const router = Router()
const { withJWTAuthMiddleware } = require("express-kun");

const protectedRouter = withJWTAuthMiddleware(router, "yourSecretKey");

router.post('/signup', user.create)
router.post('/signin', user.signin)
protectedRouter.post('/update', user.update)

module.exports = router
