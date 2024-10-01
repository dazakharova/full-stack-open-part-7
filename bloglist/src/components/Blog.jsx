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
    padding: 10,
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
      <div className="mt-4">
        <div className="mb-3">
          <span className="fw-bold">URL: </span>
          <span>{blog.url}</span>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Likes: </span>
          {blog.likes}
          <button className="btn btn-outline-secondary btn-sm ms-2" onClick={incrementLikes}>like</button>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Posted by: </span>{blog.user.name}
        </div>
        <div className="pt-3">
          <h5>Comments</h5>
          <form onSubmit={addComment} className="mb-3">
            <div className="d-flex align-items-center col-md-6">
              <input
                  value={comment}
                  onChange={handleCommentChange}
                  type="text"
                  name="comment"
                  id="comment-input"
                  className="form-control me-2"
                  placeholder="Add a comment"
              />
              <button className="btn btn-outline-secondary btn-sm ms-2" type="submit" style={{ whiteSpace: 'nowrap' }}>add comment</button>
            </div>
          </form>
          <ul className="list-group list-group-flush">
            {blog.comments ? blog.comments.map((comment, index) => {
              return (
                  <li className="list-group-item col-md-6" key={index}>{comment}</li>
              )
            }) : <></>}
          </ul>
        </div>
        {blog.user.username === username ? (
            <div className="mt-3">
              <button className="btn btn-danger btn-sm" onClick={removeBlog}>remove</button>
            </div>
        ) : null}
      </div>
  );


  // const details = () => (
  //   <div>
  //     <div>{blog.url}</div>
  //     <div>
  //       likes {blog.likes} <button className="btn btn-outline-secondary btn-sm" onClick={incrementLikes}>like</button>
  //     </div>
  //     <div>{blog.user.name}</div>
  //     <div style={{ paddingTop: '20px' }}>
  //       <h5>comments</h5>
  //       <form onSubmit={addComment}>
  //         <div className="d-flex align-items-center">
  //           <input value={comment} onChange={handleCommentChange} type="text" name="comment" id="comment-input" />
  //           <button className="btn btn-outline-secondary btn-sm" type="submit">add comment</button>
  //         </div>
  //       </form>
  //       <ul className="list-group list-group-flush">
  //         {blog.comments ? blog.comments.map((comment, index) => {
  //             return (
  //                 <li className="list-group-item col-6" key={index}>{comment}</li>
  //             )
  //           }) : <></>}
  //       </ul>
  //     </div>
  //     {blog.user.username === username ? (
  //       <div>
  //         <button className="btn btn-danger btn-sm" onClick={removeBlog}>remove</button>
  //       </div>
  //     ) : (
  //       <div></div>
  //     )}
  //   </div>
  // );

  return (
    <div className="blog container" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <button className="btn btn-outline-info btn-sm" style={hideWhenVisible} onClick={toggleVisibility}>
        view
      </button>
      <div style={showWhenVisible} className="blogDetails">
        <button className="btn btn-primary btn-sm" onClick={toggleVisibility}>hide</button>
        {details()}
      </div>
    </div>
  );
};

export default Blog;
