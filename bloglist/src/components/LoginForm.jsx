import loginService from "../services/login";
import blogService from "../services/blogs";
import {setUser} from "../reducers/loggedUserReducer";
import {setNotification} from "../reducers/notificationReducer";
import {useState} from "react";
import {useDispatch} from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

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

  return (
      <>
        <h2>log in to the application</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group col-sm-4">
            username
            <input
                className="form-control"
                type="text"
                value={username}
                name="Username"
                data-testid="username"
                onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div className="form-group col-sm-4">
            password
            <input
                className="form-control"
                type="password"
                value={password}
                name="Password"
                data-testid="password"
                onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">login</button>
        </form>
      </>
  )
}

export default LoginForm