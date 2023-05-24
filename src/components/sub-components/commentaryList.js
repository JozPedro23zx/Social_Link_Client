import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function CommentaryList(props){
    const comment = props.post
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchItems = async () =>{
            try{
                const dataUser = await fetch(`http://${process.env.REACT_APP_API}/getUser/${comment.id_user}`)
                const user = await dataUser.json()
                setUser(user)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [comment.id_user])

    return(
        <div className='comment'>
            <div className='user-info'>
            <div className='avatar-container'>
            <Link to={{pathname: `/profile/${user.id_user}`}}>
                <img className='avatar' src={user.avatar} alt='avatar'></img>
            </Link>
            </div>
            <div className='user-info-right'>
                <div className='user-name'>
                <Link to={{pathname: `/profile/${user.id_user}`}}>
                    <span className='fake-link'>{user.name}</span>
                </Link>
                </div>
            </div>
            </div>
            <div className='comment-content'>
                {comment.comment}
            </div>
        </div>
    )
}

export default CommentaryList