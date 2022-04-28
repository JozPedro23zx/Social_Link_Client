import {Link} from 'react-router-dom'
import '../customStyles/Navbar.css'

function Navbar(props){
    return(
      <div className='options'>
        <input type="search" onChange={(event) => props.searchPost(event)}></input>
        <ul>
          <li>
            <Link to="/"><p className='link'>Home</p></Link>
          </li>
          <li>
            <Link to={`/profile/${props.userId}`}><p className='link'>Profile</p></Link>
          </li>
          <li>
            <Link to="/chat"><p className='link'>Chat</p></Link>
          </li>
          <li>
            <a href={`${process.env.REACT_APP_API}/logout`}><p className='link'>Logout</p></a>
          </li>
        </ul>
      </div>
    )
}

export default Navbar