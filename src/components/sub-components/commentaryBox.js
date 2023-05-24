import Axios from "axios";
import {useState} from 'react'

function CommentaryBox(props){

    async function comment(){
        let content = document.getElementById("dataContent")
        console.log(content.innerHTML)

        const messageNotification ={
            idRecipient: props.post.id_user,
            idSender: props.userId,
            type: "comment"
        }

        await Axios({
            method: 'POST',
            data: {
                content: content.innerHTML,
                idUser: props.userId,
                idPost: parseInt(props.post.id_post)
            },
            withCredentials: true,
            url: `http://${process.env.REACT_APP_API}/createComment`,
        }).then((res) => {
            content.innerHTML = ''
        })

        await props.socket.emit("send_notification", messageNotification)
        
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