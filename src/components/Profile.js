import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProfileInfo from './sub-components/profileInfo'
import '../customStyles/Profile.css'

function Profile() {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])


    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                let dataUser = await fetch(`http://sociallinkserver.herokuapp.com/getUser/${userId}`)
                let user = await dataUser.json()
                setUser(user.data)

                let dataPosts = await fetch(`http://sociallinkserver.herokuapp.com/getAllPostsOfUser/${userId}`)
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
        return <ProfileInfo user={user} posts={posts}/>
    }
}

export default Profile