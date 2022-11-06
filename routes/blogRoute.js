const Router = require("express").Router
const BlogRouter = new Router()

const controller = require("../controller/blogController")

BlogRouter.get('/', controller.getAllBlogs)

BlogRouter.post('/', controller.createBlog)

BlogRouter.patch('/:id', controller.updateBlogState)

BlogRouter.delete('/:id', controller.deleteBlog)

module.exports = BlogRouter