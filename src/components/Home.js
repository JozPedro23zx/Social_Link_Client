import InputBox from './sub-components/inputBox'
import PostBox from './sub-components/postBox'
import { useState, useEffect } from 'react'
import Axios from 'axios'


function Home(props) {
    
    const [likeList, setArray] = useState([])
    const [allPosts, setPosts] = useState([])
    
    const searchPost = async (postContent) =>{
        let search = postContent ? postContent : 'empty'
        let allIdPosts = [0]
        allPosts.map(post => {allIdPosts.push(post.id_post)})

        try{
            await Axios({
                method: 'POST',
                data: {allIdPosts, search},
                withCredentials: true,
                url: `${process.env.REACT_APP_API}/getAllPosts`
            }).then((dataPosts)=>{
                setPosts(dataPosts.data)
            })
        }catch(err){
            console.log(err)
        }
    }

    const fetchItems = async () =>{
        let search = 'empty'
        let allIdPosts = [0]
        allPosts.map(post => {allIdPosts.push(post.id_post)})

        try{
            await Axios({
                method: 'POST',
                data: {allIdPosts, search},
                withCredentials: true,
                url: `${process.env.REACT_APP_API}/getAllPosts`
            }).then((dataPosts)=>{
                let postArray = [...allPosts]
                dataPosts.data.map(post => postArray.push(post))
                setPosts(postArray)
            })


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

    
    function Like(newLikeList){setArray(newLikeList)}

    return(
        <div className="home">
        <input className='search-input' type="search" onChange={(event) => searchPost(event.target.value)} placeholder="Search"></input>

            <div className="publication">
                <InputBox userId={props.userId} fetchItems={() => fetchItems()}/>
            </div>

            {allPosts.map(postData =>(
                <div>
                    <PostBox likeList={likeList} post={postData} handleClick={Like} userId={props.userId} />    
                </div>
            ))}

            <div className='load-posts' onClick={() => fetchItems()}>
                <p>View more</p>
                <hr></hr>
            </div>
        </div>
    )
}

export default Home
