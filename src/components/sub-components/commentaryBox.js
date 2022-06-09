import Axios from "axios";
import {useState} from 'react'

function CommentaryBox(props){

    async function comment(){
        let content = document.getElementById("dataContent")
        console.log(content.innerHTML)

        await Axios({
            method: 'POST',
            data: {
                content: content.innerHTML,
                idUser: props.userId,
                idPost: parseInt(props.postId)
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API}/createComment`,
        }).then((res) => {
            content.innerHTML = ''
        })

        props.fetchItems()
    }

    return(
        <div className="inputComment">
            <div className="inputText" placeholder="Comment">
                <div 
                    id='dataContent'
                    className="input" 
                    contenteditable="true" 
                    spellcheck="true"
                ></div>
            </div>
            <button onClick={() => comment()}>Comment</button>
        </div>
    )
}

export default CommentaryBox