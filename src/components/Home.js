import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import UsersDatabase from '../dataBase/usersPost.json'
import { useState } from 'react'

function Home() {
    const [likeList, setArray] = useState(["1", "3", "4"])
    const [users, setUsers] = useState(UsersDatabase)

    function Like(postId, like){
        console.log(users)

        if(like){
            let index = likeList.indexOf(postId)
            let newList = likeList.filter(element => element !== postId)
            if(index >= 0) setArray(newList)

        }else{
            setArray([...likeList, postId])

        }
    }

    return(
        <div className="home">
            <div className="publication">
                <InputBox />
            </div>

            {users.map(userData =>(
                <div>
                    <PostBox likeList={likeList} user={userData} handleClick={Like} />    
                </div>
            ))}
        </div>
    )
}

export default Home