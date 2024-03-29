import PostBox from './sub-components/postBox'
import CommentaryList from './sub-components/commentaryList'
import CommentaryBox from './sub-components/commentaryBox'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Comments(props){
    const { postId } = useParams()
    const [post, setPost] = useState([])
    const [likeList, setList] = useState([])
    const [commentList, setComments] = useState([])
    
        const fetchItems = async () =>{
            try{
                const response = await fetch(`http://${process.env.REACT_APP_API}/getPost/${postId}`)
                const dataPost  = await response.json()
                setPost(dataPost)
                
                const dataLikes = await fetch(`http://${process.env.REACT_APP_API}/getLikeList/${props.userId}`)
                const likes = await dataLikes.json()
                setList(likes.data.likes)

                const dataComments = await fetch(`http://${process.env.REACT_APP_API}/getComments/${postId}`)
                const comments = await dataComments.json()
                setComments(comments)
            }catch(err){
                console.log(err)
            }
        }

    useEffect(() =>{
        fetchItems()
    }, [])

        

    async function Like(newLikeList){
        setList(newLikeList)
    }

    return(
        <div className='commentary'>
            <div className='content-post'>
                <PostBox likeList={likeList} post={post} handleClick={Like} userId={props.userId} />    
                <CommentaryBox userId={props.userId} post={post} fetchItems={() => fetchItems()} socket={props.socket}/>
            </div>
            <div className='commentary-list'>
            {commentList.map(commentData =>(
                    <CommentaryList post={commentData}/>    
            ))}
            </div>
        </div>

    )
}

export default Comments