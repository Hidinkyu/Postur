import React, { useState, useEffect } from 'react';
import Post from './Post';
import postUtil from '../utils/post';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);

  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    setPosts(await postUtil.getPosts());
  };

  const createPostBody = () => {
    setNewPost(!newPost);
  };

  const logout = () => {
    localStorage.removeItem('token');
    location.reload();
  };

  return (
    <div>
      <div className='header'>
        <i
          className='fa-solid fa-right-from-bracket noselect'
          onClick={logout}
        ></i>
        <h1>PostUr</h1>
      </div>
      <div className='allPosts'>
        <button onClick={createPostBody}>New Post</button>
        {newPost ? (
          <form
            id='postSubmit'
            onSubmit={() => {
              postUtil.sendPost(document.getElementById('body').value);
              setNewPost(false);
            }}
          >
            <input type='text' id='body' required />
          </form>
        ) : (
          <></>
        )}
        <div className='posts'>
          {posts.map((data, i) => {
            return <Post key={i} data={data} setPosts={setPosts} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;

