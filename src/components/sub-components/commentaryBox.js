import Axios from "axios";


function CommentaryBox(props){

    async function comment(){
        let content = document.getElementById("inputText")


        await Axios({
            method: 'POST',
            data: {
                content: content.value,
                idUser: props.userId,
                idPost: parseInt(props.postId)
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API}/createComment`,
        }).then((res) => {
            content.value = ''
        })

        props.fetchItems()
    }

    return(
        <div className="inputComment">
            <div>
                <input type="text" id='inputText' ></input>
                <button onClick={() => comment()}>Comment</button>
            </div>
        </div>
    )
}

export default CommentaryBox