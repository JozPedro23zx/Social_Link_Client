import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProfileInfo from './sub-components/profileInfo'

function Profile(props) {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])


    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                let dataUser = await fetch(`http://${process.env.REACT_APP_API}/getUser/${userId}`)
                let user = await dataUser.json()
                setUser(user)

                let dataPosts = await fetch(`http://${process.env.REACT_APP_API}/getAllPostsOfUser/${userId}`)
                let posts = await dataPosts.json()
                setPosts(posts.data)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [userId])
    
    if(user === null){
        return <h2>User not found</h2>
    }
    else{
        return <ProfileInfo user={user} posts={posts} userAuth={props.userId}/>
    }
}

export default Profile