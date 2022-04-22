import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import { useState, useEffect } from 'react'


function Home(props) {
    
    const [likeList, setArray] = useState([])
    const [posts, setPosts] = useState([])
    
    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const dataPosts = await fetch(`${process.env.REACT_APP_API}/getAllPosts`)
                const posts = await dataPosts.json()
                setPosts(posts.data)

                const dataLikes = await fetch(`${process.env.REACT_APP_API}/getLikeList`)
                const likes = await dataLikes.json()
                setArray(likes.likes)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [])
    
    
    
    async function Like(newLikeList){
        setArray(newLikeList)
    }

    return(
        <div className="home">
            <div className="publication">
                <InputBox userId={props.userId}/>
            </div>

            {posts.map(postData =>(
                <div>
                    <PostBox likeList={likeList} post={postData} handleClick={Like} />    
                </div>
            ))}
        </div>
    )
}

export default Home
