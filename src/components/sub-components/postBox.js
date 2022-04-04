import '../../customStyles/postBox.css'
import default_like from '../../images/like.png'
import true_like from '../../images/like2.png'
import comment from '../../images/comment.png'

import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'


function PostBox(props){
    const user = props.user
    const likeList = props.likeList
    var isLike = likeList.some(element => element === user.id_post)

    const [likes, setLikesCount] = useState()
    useEffect(() => {setLikesCount(user.likes)}, [user.likes])

    console.log(user.avatar)
    
    var likeIcon = isLike ? true_like : default_like

    const date = new Date(`${user.date}`)
    return(
        <div className='post'>
            <div className='user-info'>
            <div className='avatar-container'>
                <img className='avatar' src={user.avatar} alt='avatar'></img>
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
                <div onClick={() => incrementLike(user.id_post, isLike)} className='like'><img src={likeIcon} alt={"Like button"}></img> {likes}</div>
                <Link to={`post/${user.id_post}`}><img src={comment}lt={"Comment button"} alt={"Comment button"}></img></Link>
            </div>
        </div>
    )


    async function incrementLike(postId, isLike){
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    { 
                        idUser: 5,
                        postId,
                        isLike,
                    })
            };
    
            var response = await fetch('https://sociallinkserver.herokuapp.com/changeLikeList', requestOptions)
            var data = await response.json()
            props.handleClick(data)

        }catch(err){console.log(err)}


        setLikesCount(isLike ? likes - 1 : likes + 1)

    }
}


export default PostBox