import PostBox from './sub-components/postBox'
import CommentaryList from './sub-components/commentaryList'
import CommentaryBox from './sub-components/commentaryBox'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Comments(){
    const { postId } = useParams()
    const [post, setPost] = useState([])
    const [likeList, setList] = useState([])
    const [commentList, setComments] = useState([])
    

    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const response = await fetch(`https://sociallinkserver.herokuapp.com/getPost/${postId}`)
                const dataPost  = await response.json()
                setPost(dataPost)
                
                const dataLikes = await fetch('https://sociallinkserver.herokuapp.com/getLikeList')
                const likes = await dataLikes.json()
                setList(likes.likes)

                const dataComments = await fetch(`https://sociallinkserver.herokuapp.com/getComments/${postId}`)
                const comments = await dataComments.json()
                console.log(comments)
                setComments(comments)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [postId])

        

    async function Like(newLikeList){
        setList(newLikeList)
    }

    return(
        <div className='commentary'>
            <div>
                <PostBox likeList={likeList} post={post} handleClick={Like} />    
                <CommentaryBox />
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