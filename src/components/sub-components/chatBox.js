import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom'


function ChatBox({socket, roomId, userId, messageList, receiveMessage, userSelected}){
    const [currentMessage, setCurrentMessage] = useState("")
    
    useEffect(async ()=>{
        socket.on("receive_message", (data) =>{
             receiveMessage(data)
        })
    }, [socket]) 

    const sendMessage = async () =>{
        if(currentMessage !== ""){
            const messageData = {
                roomId: roomId,
                userId: userId,
                message: currentMessage,
                time: new Date().getHours() +
                      ":" +
                      new Date().getMinutes()
            }

            await socket.emit("send_message", messageData)
            await Axios({
                method: 'POST',
                data: messageData,
                withCredentials: true,
                url: `${process.env.REACT_APP_API}/sendMessage`
            })
            receiveMessage(messageData)
            setCurrentMessage("")
        }
    }
    

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>{userSelected.name}</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent)=>{
                        return(
                            <div className='message' id={userId === messageContent.userId ? "you" : "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id='time'>{messageContent.time}</p>
                                    </div>
                                </div>
                            </div>
                            )
                        })                    
                    }
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input 
                    type="text" 
                    placeholder="Hey..." 
                    value={currentMessage}
                    onChange={
                        (event) => setCurrentMessage(event.target.value)
                    } 
                    onKeyPress={(event) =>{
                        event.key === 'Enter' && sendMessage()
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default ChatBox