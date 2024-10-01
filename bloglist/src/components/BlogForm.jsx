import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { createBlog } from '../reducers/blogReducer.js'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    dispatch(setNotification({message: `a new blog ${title} by ${author} added`, type: 'success'}, 5000))

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div className="form-group">
          <label>
            title:
            <input
              className="form-control"
              type="text"
              value={title}
              name="title"
              id="title-input"
              data-testid="title"
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            author:
            <input
              className="form-control"
              type="text"
              value={author}
              name="author"
              id="author-input"
              data-testid="author"
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            url:
            <input
              className="form-control"
              type="text"
              value={url}
              name="url"
              id="url-input"
              data-testid="url"
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.protoTypes = {
  createBlog: PropTypes.func.isRequired,
};
export default BlogForm;
