import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom'


function ChatBox({socket, roomId, userId, messageList, receiveMessage, userSelected}){
    const [currentMessage, setCurrentMessage] = useState("")
    const MyTimeZone = Intl.DateTimeFormat().resolvedOptions().locale;
    const optionsDate = {
        month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'
    };

    useEffect(()=>{
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
                time: new Date()
            }

            const messageNotification ={
                idRecipient: userSelected.id_user,
                idSender: userId,
                type: "chat"
            }

            receiveMessage(messageData)
            await socket.emit("send_message", messageData)
            await socket.emit("send_notification", messageNotification)
            await Axios({
                method: 'POST',
                data: messageData,
                withCredentials: true,
                url: `http://${process.env.REACT_APP_API}/sendMessage`
            })
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
                        var MyDate = new Date(messageContent.time)
                        var dateUser = new Intl.DateTimeFormat(MyTimeZone, optionsDate).format(MyDate)
                        return(
                            <div className='message' id={userId === messageContent.userId ? "you" : "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id='time'>{dateUser}</p>
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