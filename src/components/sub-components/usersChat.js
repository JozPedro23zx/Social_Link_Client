import { useEffect, useState } from 'react'
import Axios from 'axios'

function UserChat(props){
    const [user, setUser] = useState([])
    let arrayOfId = props.room.users
    let userId = ''
    arrayOfId.map(id => id !== props.userId ? userId = id : '')

    useEffect(async () =>{
        setUser(await props.selectUser(userId))
    }, [userId])

    console.log(props.room)

    return(
        <div onClick={()=>{props.joinRoom(props.room.id_room, user.id_user)}} className='avatar-container'>
                <img className='avatar' src={user.avatar} alt='avatar'></img>
                <p>{user.name}</p>
        </div>
    )
}

export default UserChat