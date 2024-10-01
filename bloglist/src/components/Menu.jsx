import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {removeUser} from '../reducers/loggedUserReducer'
import {useDispatch} from 'react-redux'

const Menu = () => {
  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(removeUser())
  };

  return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav w-100 d-flex justify-content-between">
          <div className="d-flex">
            <li className="nav-item">
              <Link className="nav-link" style={padding} to="/" >blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={padding} to="/users" >users</Link>
            </li>
          </div>
          <li className="nav-item d-flex align-items-center">
            {loggedUser !== null ? (
                <>
                  <span style={padding}>{loggedUser.name} logged in</span>
                  <button className="btn btn-outline-danger ml-2" onClick={handleLogout} type="submit">
                    logout
                  </button>
                </>
            ) : null}
          </li>
        </ul>
      </div>
  )
}

export default Menu