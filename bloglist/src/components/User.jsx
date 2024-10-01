import {Link} from 'react-router-dom'

const User = ({ user }) => {

  return (
      <>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul className="list-group">
          {user.blogs.map((blog, index) => {
            return (
              <li className="list-group-item" key={index}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
            )
          })}
        </ul>
      </>
  )
}

export default User