import Blog from "./Blog";
import {useSelector} from 'react-redux'

const Blogs = ({ blogs }) => {
  const loggedUser = useSelector(state => state.loggedUser)
  let username

  if (!loggedUser) {
    username = null
  } else {
    username = loggedUser.username
  }



  return (
      <div>
        {
          [...blogs].sort((a, b) => b.likes - a.likes).map(blog => {
            return (
                <Blog
                    key={blog.id}
                    blog={blog}
                    username={username}
                />
            )
          })
        }
      </div>
  )
}

export default Blogs