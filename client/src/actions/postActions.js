import axios from 'axios';
import {
  GET_POSTS,
  POST_ERROR,
  GET_ERRORS
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}