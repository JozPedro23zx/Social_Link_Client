import PostBox from './postBox'
import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'


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
            <div>
                {/* <Link to={"#"}> <p>Talk</p> </Link> */}
                <Link to="/settings"> <p>Settings</p> </Link>
            </div>
            <div className='allPost'>
                <AllPost posts={posts} userId={props.userId}/>
            </div>
        </div>
    )
}

function AllPost(props){
    const [likeList, setArray] = useState([])
    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const dataLikes = await fetch(`${process.env.REACT_APP_API}/getLikeList/${props.userId}`)
                const likes = await dataLikes.json()
                setArray(likes.likes)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [props.userId])

    async function Like(newLikeList){
        setArray(newLikeList)
    }

    var posts = props.posts
    if(posts !== []){
        return(
            posts.map(postData =>(
                <div>
                    <PostBox likeList={likeList} post={postData} handleClick={Like} userId={props.userId}/>    
                </div>
            ))
        )
    }
}

export default ProfileInfo