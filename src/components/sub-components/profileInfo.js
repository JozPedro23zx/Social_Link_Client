import PostBox from './postBox'
import {useEffect, useState} from 'react'

function ProfileInfo(props){
    const user = props.user
    const posts = props.posts
    return(
        <div className='profile'>
            <div className='profileHeader'>
                <div className='profileInfo'>
                    <div className='avatar-container'>
                        <img className='avatar' alt='avatar' src={user.avatar}></img>
                    </div>
                    <h2>{user.name}</h2>
                </div>
            </div>
            <hr></hr>
            <div className='allPost'>
                <AllPost posts={posts}/>
            </div>
        </div>
    )
}

function AllPost(props){
    const [likeList, setArray] = useState([])
    useEffect(() =>{
        const fetchItems = async () =>{
            try{
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

    var posts = props.posts
    if(posts !== []){
        return(
            posts.map(postData =>(
                <div>
                    <PostBox likeList={likeList} post={postData} handleClick={Like} />    
                </div>
            ))
        )
    }
}

export default ProfileInfo