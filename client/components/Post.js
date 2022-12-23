import React, { useState, useEffect } from 'react';
import postUtil from '../utils/post';

const Post = ({ setPosts, data }) => {
  const [likePostCount, setLikePostCount] = useState(data.likes.length);
  const [commenting, setCommenting] = useState(false);
  const [updateing, setUpdateing] = useState(false);

  useEffect(() => {});

  const deletePost = () => {
    postUtil.deletePost(data._id);
    setPosts((posts) => posts.filter((post) => post._id !== data._id));
  };

  const likePost = () => {
    postUtil.likePost(data._id);
    setLikePostCount(data.likes.length);
    console.log(data.comments);
  };

  const comment = () => {
    setCommenting(!commenting);
  };
  const update = () => {
    setUpdateing(!updateing);
  };

  return (
    <div className='indivPosts'>
      <h1>{data.body}</h1>
      <i className='fa-solid fa-comments' onClick={comment}></i>
      <i className='fa-solid fa-trash' onClick={deletePost}></i>
      <i className='fa-solid fa-pen-to-square' onClick={update}></i>
      {commenting ? (
        <>
          <div className='commenting'>
            <input type='text' id='commentBody' required />
            <button
              onClick={() =>
                postUtil.commentPost(
                  data._id,
                  document.getElementById('commentBody').value,
                )
              }
            >
              Send It
            </button>
          </div>
          <div className='comments'>
            {data.comments.map((comment, index) => (
              <div className='comment' key={index + 'c'}>
                <h2>{comment.body}</h2>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {updateing ? (
        <div className='updating'>
          <form
            onSubmit={() =>
              postUtil.updatePost(
                data._id,
                document.getElementById('updateBody').value,
              )
            }
          >
            <input type='text' id='updateBody'/>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
