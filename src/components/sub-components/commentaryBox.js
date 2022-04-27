import '../../customStyles/commentaryBox.css'
import Axios from "axios";


function CommentaryBox(props){

    function comment(){
        let content = document.getElementById("inputText")


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