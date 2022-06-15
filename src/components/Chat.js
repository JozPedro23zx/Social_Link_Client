import io from "socket.io-client"
import Axios from "axios"

import { useState, useEffect } from "react";

import ChatBox from "./sub-components/chatBox";
import UserChat from "./sub-components/usersChat"

const socket = io.connect(`${process.env.REACT_APP_API}`, {transports: ['websocket']})

function Chat(props) {
    const [showChat, setShowChat] = useState(false); 
    const [userChat, setUser] = useState('')
    
    const [roomsList, setRoomsList] = useState([]);
    const [roomId, setRoomId] = useState(0)
    const [messageList, setMessageList] = useState([])

    useEffect(() =>{
      rooms()
    }, [])
    
  async function rooms(){
    await Axios({
      method: "POST",
      data:{
        idUser: props.userId
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_API}/getAllRooms`,
    }).then((res)=>{
      setRoomsList(res.data)
    })
  }
  
  const joinRoom = async (room, userSelected) => {
      if (showChat) socket.emit('leave_room', roomId)
      socket.emit("join_room", room);

      await loadMessage(room)
      setUser(await selectUser(userSelected))

      setRoomId(room)
      setShowChat(true);
  };  

  async function selectUser(userId){
    let response = ''
    await Axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/getUser/${userId}`,
    }).then((res)=>{
        response = res.data
    })
    return response
  }

  async function loadMessage(idRoom){
    await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/getMessage/${idRoom}`
    }).then((res) =>{setMessageList(res.data)})
  }

  const receiveMessage = (message)=>{
        // var MyTimeZone = Intl.DateTimeFormat().resolvedOptions().locale;
        // var options = {
        //   year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
        // };
        // var dateUser = new Intl.DateTimeFormat(MyTimeZone, options).format(message.date)
        // console.log(dateUser)
        // message.date = dateUser
        // console.log(message.date)

    setMessageList((list) => [...list, message])
  }


    return (
      <div className="chat-content">
        <div className="chat-nav-bar">
          {roomsList.map(room =>(
            <UserChat room={room} userId={props.userId} joinRoom={joinRoom} selectUser={selectUser}/>
          ))}
        </div>
        <div>
          {showChat ? <ChatBox socket={socket} roomId={roomId} userId={props.userId} userSelected={userChat} receiveMessage={receiveMessage} messageList={messageList}/> : <></>}  
        </div>
      </div>

    );
}

export default Chat