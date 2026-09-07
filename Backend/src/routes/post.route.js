const express = require("express")
const PostController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()


/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
 */
postRouter.post("/", identifyUser, upload.single("image"), PostController.createPostController)

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */
postRouter.get("/", identifyUser, PostController.getPostController)


/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", identifyUser, PostController.getPostDetailsController)


/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId", identifyUser, PostController.likePostController)

/**
 * @route Get/api/posts/feed
 * @description get all the post created in th db
 * @access private
 */
postRouter.get("/feed", identifyUser, PostController.getFeedController)
postRouter.post("/unlike/:postId", identifyUser, PostController.unLikePostController)

module.exports = postRouter
