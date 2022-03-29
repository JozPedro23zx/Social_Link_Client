import '../../customStyles/postBox.css'
import default_like from '../../images/like.png'
import true_like from '../../images/like2.png'

import comment from '../../images/comment.png'
import {Link} from 'react-router-dom'
import {useState} from 'react'


function PostBox(props){
    const user = props.user
    const likeList = props.likeList
    var isLike = likeList.some(element => element === user.idPost)

    const [likes, setLikesCount] = useState(user.likes)
    
    var likeIcon = isLike ? true_like : default_like
    

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
                    <Link to={`profile/${user.idUser}`}><span className='fake-link'>{user.name}</span></Link>
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
                <div onClick={() => incrementLike()} className='like'><img src={likeIcon} alt={"Like button"}></img> {likes}</div>
                <img src={comment}lt={"Comment button"} alt={"Comment button"}></img>
            </div>
        </div>
    )


    function incrementLike(){
        props.handleClick(user.idPost, isLike)

        setLikesCount(isLike ? likes - 1 : likes + 1)

    }
}


export default PostBox