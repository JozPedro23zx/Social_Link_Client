import {Link} from 'react-router-dom'

function Navbar(props){
  function logout(){
    localStorage.removeItem('token')
  }
    return(
      <div className='options'>
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
            <a href={`${process.env.REACT_APP_API}/logout`}><p onClick={() => logout()} className='link exit'>Logout</p></a>
          </li>
        </ul>
      </div>
    )
}

export default Navbar