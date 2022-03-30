import { useParams } from 'react-router-dom'

function Comments(){
    const { postId } = useParams()
    console.log(postId)
}

export default Comments