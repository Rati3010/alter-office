const express = require("express");
const {
  createComment,
  getCommentsForPost,
  replyToComment,
  expandComments,
} = require("../controllers/commentController.js");
const authMiddleware  = require("../middlewares/authMiddleware.js");
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post(
  "/posts/:postId/comments",
  authMiddleware,
  rateLimiter,
  createComment
);
router.get('/posts/:postId/comments', getCommentsForPost);
router.post('/posts/:postId/comments/:commentId/reply', authMiddleware, rateLimiter, replyToComment);
router.get('/posts/:postId/comments/:commentId/expand', expandComments);

module.exports = router;
