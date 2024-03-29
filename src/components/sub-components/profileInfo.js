import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import Axios from 'axios'
import PostBox from './postBox'



function ProfileInfo(props){
    const user = props.user
    const posts = props.posts
    const navigate = useNavigate()

    async function talkUser(){
        await Axios({
            method: 'POST',
            data:{
                user1: props.userAuth,
                user2: user.id_user
            },
            withCredentials: true,
            url: `http://${process.env.REACT_APP_API}/createRoom`
        })
        navigate('/chat')
    }

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
            <div className='buttons'>
                {
                    props.userAuth === user.id_user ? 
                    <Link to="/settings"> <p className='settings-button'>Settings</p> </Link> :
                    <p className='talk-button' onClick={() => talkUser()}>Talk</p>
                }
                
            </div>
            <div className='allPost'>
                <AllPost posts={posts} userId={props.userAuth}/>
            </div>
        </div>
    )
}

function AllPost(props){
    const [likeList, setArray] = useState([])
    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const dataLikes = await fetch(`http://${process.env.REACT_APP_API}/getLikeList/${props.userId}`)
                const likes = await dataLikes.json()
                setArray(likes.data.likes)
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