import PostBox from './sub-components/postBox'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Comments(){
    const { postId } = useParams()
    const [post, setPost] = useState([])
    const [likeList, setList] = useState([])
    
    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                const response = await fetch(`http://localhost:8000/getPost/${postId}`)
                const dataPost  = await response.json()
                console.log(dataPost)
                setPost(dataPost)
                
                const dataLikes = await fetch('http://localhost:8000/getLikeList')
                const likes = await dataLikes.json()
                setList(likes.likes)
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
        <div>
            <PostBox likeList={likeList} user={post} handleClick={Like} />    
        </div>
    )
}

export default Comments