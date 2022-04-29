import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import { useState, useEffect } from 'react'


function Home(props) {
    
    const [likeList, setArray] = useState([])
    const [posts, setPosts] = useState([])
    
    const fetchItems = async () =>{
        let search = props.postContent || 'empty'
        console.log(search)

        try{
            const dataPosts = await fetch(`${process.env.REACT_APP_API}/getAllPosts/${search}`)
            const posts = await dataPosts.json()
            console.log(posts.data)
            setPosts(posts.data)

            const dataLikes = await fetch(`${process.env.REACT_APP_API}/getLikeList/${props.userId}`)
            const likes = await dataLikes.json()
            setArray(likes.likes)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        fetchItems()
    }, [])
    
    
    
    async function Like(newLikeList){
        setArray(newLikeList)
    }

    return(
        <div className="home">
            <div className="publication">
                <InputBox userId={props.userId} fetchItems={() => fetchItems()}/>
            </div>

            {posts.map(postData =>(
                <div>
                    <PostBox likeList={likeList} post={postData} handleClick={Like} userId={props.userId} />    
                </div>
            ))}
        </div>
    )
}

export default Home
