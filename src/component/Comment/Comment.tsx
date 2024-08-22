import axios from "axios";
import React, { useEffect, useState } from "react";
import './Comment.css'

interface Reply {
  _id: string;
  text: string;
  userId: string;
  user: {
    name: string;
  };
  createdAt: string;
}

interface CommentType {
  _id: string;
  text: string;
  userId: {
    username:string;
  };
  replies: Reply[];
  createdAt: string;
}

const Comment: React.FC<{ postId: string }> = ({
  postId,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`);
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);
  const toggleReplies = (commentId: string) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyChange = (commentId: string, text: string) => {
    setReplyText((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };

  const handleReplySubmit = async (commentId: string) => {
    try {
      const response = await axios.post(`/api/comments/${commentId}/reply`, {
        text: replyText[commentId],
      });
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: [...comment.replies, response.data],
              }
            : comment
        )
      );
      setReplyText((prev) => ({
        ...prev,
        [commentId]: "",
      }));
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  return (
    <div className="comments">
      {comments && comments.map((comment) => (
        <div key={comment._id} style={{ marginBottom: "1rem" }}>
          <p>
            <strong>{comment.userId.username}</strong>: {comment.text}
          </p>
          <button onClick={() => toggleReplies(comment._id)}>
            {showReplies[comment._id] ? "Hide Replies" : "Show Replies"}
          </button>

          {showReplies[comment._id] && (
            <div style={{ marginLeft: "1rem" }}>
              {comment.replies.map((reply) => (
                <div key={reply._id}>
                  <p>
                    <strong>{reply.user.name}</strong>: {reply.text}
                  </p>
                </div>
              ))}
              <input
                type="text"
                value={replyText[comment._id] || ""}
                onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                placeholder="Write a reply..."
              />
              <button onClick={() => handleReplySubmit(comment._id)}>
                Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
