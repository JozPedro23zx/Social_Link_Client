import {Link} from 'react-router-dom'
import '../customStyles/Navbar.css'

function Navbar(props){
    return(
      <div className='options'>
        <input type="search"></input>
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
        </ul>
      </div>
    )
}

export default Navbar