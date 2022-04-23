import '../../customStyles/commentaryBox.css'
import Axios from "axios";


function CommentaryBox(props){

    function comment(){
        let content = document.getElementById("inputText")
        console.log(content.value)
        console.log(props.userId)
        console.log(props.postId)

        Axios({
            method: 'POST',
            data: {
                content: content.value,
                idUser: props.userId,
                idPost: parseInt(props.postId)
            },
            withCredentials: true,
            url: "http://localhost:8000/createComment",
        }).then((res) => {
            console.log(res.data)
            content.value = ''
        })
    }

    return(
        <div className="inputComment">
            <div>
                <textarea id='inputText' ></textarea>
                <button onClick={() => comment()}>Comment</button>
            </div>
        </div>
    )
}

export default CommentaryBox