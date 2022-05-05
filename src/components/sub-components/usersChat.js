import { useEffect, useState } from 'react'
import Axios from 'axios'

function UserChat(props){
    const [user, setUser] = useState([])
    let arrayOfId = props.room.users
    let userId = ''
    arrayOfId.map(id => id !== props.userId ? userId = id : '')

    useEffect(async () =>{
        await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/getUser/${userId}`,
        }).then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
    }, [userId])
    return(
        <div onClick={()=>{props.joinRoom(props.room.id_room)}} className='avatar-container'>
                <img className='avatar' src={user.avatar} alt='avatar'></img>
                <p>{user.name}</p>
        </div>
    )
}

export default UserChat