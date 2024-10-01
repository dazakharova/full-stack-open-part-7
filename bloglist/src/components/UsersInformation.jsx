import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const UsersInformation = () => {
  const users = useSelector(state => state.users)

  return (
      <>
        <h1>Users</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">blogs created</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => {
            return (
                <tr key={index}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
            )
          })}
          </tbody>
        </table>
      </>
  )
}

export default UsersInformation