import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    )
}

export default Navbar