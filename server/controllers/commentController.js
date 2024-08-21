const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { postId, text } = req.body;
  console.log(postId , text);

  try {
    const comment = await Comment.create({ postId, text, userId: req.user._id });
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.replyToComment = async (req, res) => {
  const { postId, commentId, text } = req.body;
  try {
    const reply = await Comment.create({ postId, text, userId: req.user._id, parentCommentId: commentId });
    res.status(201).json({ success: true, data: reply });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCommentsForPost = async (req, res) => {
  const { postId } = req.params;
  const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  console.log(postId)
  try {
    const comments = await Comment.find({ postId, parentCommentId: null })
      .sort({ [sortBy]: sortOrder })
      .populate('userId', 'username');
    
    // Fetch latest two replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentCommentId: comment._id })
          .sort({ createdAt: 'desc' })
          .limit(2);
        return { ...comment._doc, replies, totalReplies: replies.length };
      })
    );

    res.status(200).json({ success: true, data: commentsWithReplies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.expandComments = async (req, res) => {
  const { postId, commentId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const replies = await Comment.find({ postId, parentCommentId: commentId })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .sort({ createdAt: 'asc' });

    res.status(200).json({ success: true, data: replies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
