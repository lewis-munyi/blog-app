const { Router } = require('express')
const post = require('../controllers/post.controller.js')
const router = Router()
const { withJWTAuthMiddleware } = require('express-kun')

const protectedRouter = withJWTAuthMiddleware(router, 'yourSecretKey')

// Create a new post
protectedRouter.post('/new', post.create)

// Retrieve latest posts
router.get('/all', post.findAll)

// Retrieve a single post by id
router.get('/:postId', post.findOne)

// Retrieve all of a user's posts
router.get('/all/:id', post.findBlog)

// Update a post by id
protectedRouter.put('/:postId', post.update)

// Delete a post by noteId
protectedRouter.delete('/:postId', post.delete)

module.exports = router
