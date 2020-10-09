const { Router } = require('express')
const user = require('../controllers/user.controller.js')
const router = Router()
const { withJWTAuthMiddleware } = require('express-kun')

const protectedRouter = withJWTAuthMiddleware(router, 'yourSecretKey')

router.post('/signup', user.create)
router.post('/signin', user.signin)
protectedRouter.get('/verify', user.verify)
protectedRouter.post('/update', user.update)
protectedRouter.delete('/delete', user.delete)

module.exports = router
