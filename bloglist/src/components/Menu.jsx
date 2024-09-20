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
      <>
        <Link style={padding} to="/" >blogs</Link>
        <Link style={padding} to="/users" >users</Link>
        {loggedUser !== null ? (
            <div>
              <span style={padding}>{loggedUser.name} logged in</span>
              <button onClick={handleLogout} type="submit">
                logout
              </button>
            </div>
          ) : (<></>)}

      </>
  )
}

export default Menu