import { useState, useRef } from 'react';
import { updateBlogLikes, updateBlogComments, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {Navigate} from 'react-router-dom'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState('')

  if (!blog) {
    return (
        <Navigate replace to="/" />
    )
  }

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const incrementLikes = (event) => {
    event.preventDefault();
    dispatch(updateBlogLikes(
      {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        comments: blog.comments
      },
      blog.id
    ))
  }

  const handleCommentChange = (event) => {
    const comment = event.target.value
    setComment(comment)
  }

  const addComment = (event) => {
    event.preventDefault()

    if (!comment.trim()) return

    dispatch(updateBlogComments(
        comment,
        blog.id
    ))
    setComment('')
  }

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  };

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={incrementLikes}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div>
        <h2>comments</h2>
        <form onSubmit={addComment}>
          <input value={comment} onChange={handleCommentChange} type="text" name="comment" id="comment-input" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments ? blog.comments.map((comment, index) => {
              return (
                  <li key={index}>{comment}</li>
              )
            }) : <></>}
        </ul>
      </div>
      {blog.user.username === username ? (
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        view
      </button>
      <div style={showWhenVisible} className="blogDetails">
        <button onClick={toggleVisibility}>hide</button>
        {details()}
      </div>
    </div>
  );
};

export default Blog;
