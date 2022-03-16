import { useParams } from 'react-router-dom'
import UsersDatabase from '../dataBase/users.json'
import PostsDatabase from '../dataBase/usersPost.json'
import PostBox from './sub-components/postBox'
import '../customStyles/Profile.css'

function Profile() {
    const { userId } = useParams()
    var userContent = ""

    UsersDatabase.some(user =>{
        
        if(user.id === userId){
            const avatarImage = {
                background: `url(${user.avatar})`,
                backgroundSize: "cover"
            }

            userContent = (
                <div className='profile'>
                    <div className='profileHeader'>
                        <div className='profileInfo'>
                            <div className='avatar-container'>
                                <div className='avatar' style={avatarImage}></div>
                            </div>
                            <h2>{user.name}</h2>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='allPost'>
                        <AllPost id={user.id}/>
                    </div>
                </div>
            )
        }
    })

    return(
        <div>
            {userContent ? userContent : <h1>User not found</h1>}
        </div>
    )
}

function AllPost(props){
    var allPost = PostsDatabase.map(postData =>{
        if(postData.id === props.id){
            return postData
        }
    })

    allPost = allPost.filter(function(element){
        return element !== undefined
    })

    return(
        allPost.map(userData =>(
            <div>
                <PostBox user={userData} />    
            </div>
        ))
    )
}

export default Profile