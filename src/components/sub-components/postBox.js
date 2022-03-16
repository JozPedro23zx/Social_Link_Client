import '../../customStyles/postBox.css'
import like from '../../images/like.png'
import comment from '../../images/comment.png'
import {Link} from 'react-router-dom'


function PostBox(props){
    const user = props.user
    const avatarImage = {
        background: `url(${user.avatar})`,
        backgroundSize: "cover"
    }

    const date = new Date(`${user.date}`)
    return(
        <div className='post'>
            <div className='user-info'>
            <div className='avatar-container'>
                <div className='avatar' style={avatarImage}></div>
                {/* <img className='avatar' src={user.icon} alt='avatar'></img> */}
            </div>
            <div className='user-info-right'>
                <div className='user-name'>
                    <Link to={`profile${user.id}`}><span className='fake-link'>{user.name}</span></Link>
                </div>
            </div>
            </div>

            <div className='post-content'>
                {user.content}
            </div>

            <div className='metadata'>
                {`${date.getDate()}/${(date.getUTCMonth()+1)}/${date.getFullYear()}`}
            </div>

            <div className='bottom-buttons'>
                <div className='like'><img src={like} alt={"Like button"}></img> {user.likes}</div>
                <img src={comment}lt={"Comment button"} alt={"Comment button"}></img>
            </div>
        </div>
    )
}


export default PostBox