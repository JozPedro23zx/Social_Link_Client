import '../../customStyles/postBox.css'
import default_like from '../../images/like.png'
import true_like from '../../images/like2.png'
import comment from '../../images/comment.png'

import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'


function PostBox(props){
    const post = props.post
    const likeList = props.likeList

    console.log(likeList)


    var isLike = likeList.some(element => element === post.id_post)
    const [likes, setLikesCount] = useState()
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchItems = async () =>{
            try{
                const dataUser = await fetch(`${process.env.REACT_APP_API}/getUser/${post.id_user}`)
                const user = await dataUser.json()
                setUser(user.data)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
        setLikesCount(post.likes)
    }, [post.likes, post.id_user])
    
    var likeIcon = isLike ? true_like : default_like

    const date = new Date(`${post.date}`)
    return(
        <div className='post'>
            <div className='user-info'>
            <div className='avatar-container'>
                <img className='avatar' src={user.avatar} alt='avatar'></img>
            </div>
            <div className='user-info-right'>
                <div className='user-name'>
                    <Link to={{pathname: `/profile/${user.id_user}`}}><span className='fake-link'>{user.name}</span></Link>
                </div>
            </div>
            </div>

            <div className='post-content'>
                {post.content}
            </div>

            <div className='metadata'>
                {`${date.getDate()}/${(date.getUTCMonth()+1)}/${date.getFullYear()}`}
            </div>

            <div className='bottom-buttons'>
                <div onClick={() => incrementLike(post.id_post, isLike)} className='like'><img src={likeIcon} alt={"Like button"}></img> {likes}</div>
                <Link to={`/post/${post.id_post}`}><img src={comment}lt={"Comment button"} alt={"Comment button"}></img></Link>
            </div>
        </div>
    )


    async function incrementLike(postId, isLike){
        console.log("Increment Like")
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
    
            var response = await fetch(`${process.env.REACT_APP_API}/changeLikeList`, requestOptions)
            var data = await response.json()
            props.handleClick(data)

        }catch(err){console.log(err)}


        setLikesCount(isLike ? likes - 1 : likes + 1)

    }
}


export default PostBox