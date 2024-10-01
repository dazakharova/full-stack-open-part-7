import {
  Routes, Route, Link, useMatch, Navigate
} from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Menu from './components/Menu';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm'
import Notification from './components/Notification';
import UsersInformation from './components/UsersInformation'
import User from './components/User'
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import {useDispatch, useSelector} from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer.js'
import { setUser } from './reducers/loggedUserReducer.js'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const matchUser = useMatch('/users/:id')
  const user = matchUser
      ? users.find(user => user.id === matchUser.params.id)
      : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
      ? blogs.find(blog => blog.id === matchBlog.params.id)
      : null

  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    dispatch(initializeUsers())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  const blogForm = () => (
    <Togglable buttonStyle="btn btn-primary" buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const Home = () => {
    return (
        <div>
          {loggedUser === null ? (
              <LoginForm />
          ) : (
              <div>
                <h1>blog app</h1>

                {blogForm()}
                <ul className="list-group">
                  {blogs ? (blogs.map((blog, index) => {
                    return (
                        <li className="list-group-item list-group-item-action" key={index}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
                    )
                  })) : <></>}
                </ul>
              </div>
          )}

        </div>
    )
  }

  return (
    <div className="container">
      <Menu />
      <Notification />
      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element= { loggedUser ? <Blog blog={blog} username={loggedUser.username} /> : <Navigate to="/" /> } />
        <Route path="/users" element={<UsersInformation />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  );
};

export default App;
