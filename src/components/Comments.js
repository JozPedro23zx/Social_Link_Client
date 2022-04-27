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
    

    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/getPost/${postId}`)
                const dataPost  = await response.json()
                setPost(dataPost)
                
                const dataLikes = await fetch(`${process.env.REACT_APP_API}/getLikeList/${props.userId}`)
                const likes = await dataLikes.json()
                setList(likes.likes)

                const dataComments = await fetch(`${process.env.REACT_APP_API}/getComments/${postId}`)
                const comments = await dataComments.json()
                setComments(comments)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [postId, props.userId])

        

    async function Like(newLikeList){
        setList(newLikeList)
    }

    return(
        <div className='commentary'>
            <div>
                <PostBox likeList={likeList} post={post} handleClick={Like} userId={props.userId} />    
                <CommentaryBox userId={props.userId} postId={postId}/>
            </div>
            {commentList.map(commentData =>(
                <div>
                    <CommentaryList post={commentData}/>    
                </div>
            ))}
        </div>

    )
}

export default Comments