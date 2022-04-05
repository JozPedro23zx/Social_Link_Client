import { useState, useEffect } from 'react'

function CommentaryList(props){
    const comment = props.post
    const [user, setUser] = useState([])

    console.log(comment)

    useEffect(() => {
        const fetchItems = async () =>{
            try{
                const dataUser = await fetch(`http://sociallinkserver.herokuapp.com/getUser/${comment.id_user}`)
                const user = await dataUser.json()
                setUser(user.data)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [comment.id_user])

    return(
        <div className='post'>
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
            <div className='post-content'>
                {comment.comment}
            </div>
        </div>
    )
}

export default CommentaryList