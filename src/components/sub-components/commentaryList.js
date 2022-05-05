import '../../customStyles/commentaryList.css'
import { useState, useEffect } from 'react'

function CommentaryList(props){
    const comment = props.post
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchItems = async () =>{
            try{
                const dataUser = await fetch(`${process.env.REACT_APP_API}/getUser/${comment.id_user}`)
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
                <img className='avatar' src={user.avatar} alt='avatar'></img>
            </div>
            <div className='user-info-right'>
                <div className='user-name'>
                    <span className='fake-link'>{user.name}</span>
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