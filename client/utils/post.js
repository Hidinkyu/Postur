import Axios from 'axios';

const API_BASE = '/api/posts';
const authorization = localStorage.getItem('token');

const postUtil = {
  async getPosts() {
    let data;
    await Axios.get(API_BASE).then((res) => {
      data = res.data;
    });
    return data;
  },

  sendPost(text) {
    Axios.post(API_BASE + '/create/' + authorization, {
      text,
    });
  },

  deletePost(postID) {
    Axios.delete(API_BASE + '/delete/' + postID + '/' + authorization);
  },

  updatePost(postID, body) {
    Axios.patch(API_BASE + '/update/' + postID + '/' + authorization, {
      text: body,
    });
  },

  likePost(postID) {
    Axios.patch(API_BASE + '/like/' + postID + '/' + authorization);
  },

  commentPost(postID, comment) {
    Axios.patch(API_BASE + '/comment/' + postID + '/' + authorization, {
      comment,
    });
  },
};

export default postUtil;
