import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import {useDispatch, useSelector} from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import { initializeBlogs, createBlog, updateBlog } from './reducers/blogReducer.js'
import { setUser, removeUser } from './reducers/loggedUserReducer.js'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setNotification({message: `a new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success'}, 5000))
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user))
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong username or password', type: 'error' }, 5000))
    }
  };

  const loginForm = () => (
    <>
      <h2>log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(removeUser())
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout} type="submit">
            logout
          </button>
          {blogForm()}
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
