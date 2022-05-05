import io from "socket.io-client"
import Axios from "axios"

import { useState, useEffect } from "react";
import '../customStyles/Chat.css'
import image from '../images/coming-soon.jpg'

import ChatBox from "./sub-components/chatBox";
import UserChat from "./sub-components/usersChat"

const socket = io.connect("http://localhost:8000")

function Chat(props) {
    const [showChat, setShowChat] = useState(false);    
    const [roomsList, setRoomsList] = useState([]);
    const [roomId, setRoomId] = useState('')

  function rooms(){
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_API}/getAllRooms`,
    }).then((res)=>{
      setRoomsList(res.data)
      console.log(res.data)
    })
  }
  
  const joinRoom = (room) => {
      setRoomId(room)
      socket.emit("join_room", room);
      setShowChat(true);
  };  

  useEffect(() =>{
    rooms()
  }, [])

    return (
      <div>
        <div className="chat-nav-bar">
          {roomsList.map(room =>(
            <UserChat room={room} userId={props.userId} joinRoom={joinRoom} />
          ))}
        </div>
        <div>
          {showChat ? <ChatBox socket={socket} roomId={roomId} userId={props.userId} /> : <></>}  
        </div>
      </div>

      // <img src={image} alt="coming soon" style={{width: "100%", height: "auto"}}/>
    );
}

export default Chat