import React from 'react'
import CommentInput from '../../component/CommentInput/CommentInput';
import './Post.css';
import Comment from '../../component/Comment/Comment';

const Post:React.FC = () => {
  return (
    <div className='post-comment'>
        <CommentInput postId="60df41c0b4d2f39e1c8a4e65"/>
        <Comment postId="60df41c0b4d2f39e1c8a4e65"/>
    </div>
  )
}

export default Post