import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import { useState, useEffect } from 'react'

function Home() {
    
    const [likeList, setArray] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const dataPosts = await fetch('http://localhost:8000/getAllPosts')
                const posts = await dataPosts.json()
                setUsers(posts.data)

                const dataLikes = await fetch('http://localhost:8000/getLikeList')
                const likes = await dataLikes.json()
                setArray(likes.likes)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [])
    
    
    
    async function Like(postId, isLike){
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
    
            var response = await fetch('http://localhost:8000/changeLikeList', requestOptions)
            var data = await response.json()
            setArray(data)
        }catch(err){console.log(err)}
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
