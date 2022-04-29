import { useState } from "react";
import ChatBox from "./sub-components/chatBox";
import '../customStyles/Chat.css'
import image from '../images/coming-soon.jpg'

function Chat() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);    
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        // socket.emit("join_room", room);
        setShowChat(true);
      }
    };  
    return (
      // <div>
      //   {!showChat ? (
      //     <div className="joinChatContainer">
      //       <h3>Join A Chat</h3>
      //       <input
      //         type="text"
      //         placeholder="John..."
      //         onChange={(event) => {
      //           setUsername(event.target.value);
      //         }}
      //       />
      //       <input
      //         type="text"
      //         placeholder="Room ID..."
      //         onChange={(event) => {
      //           setRoom(event.target.value);
      //         }}
      //       />
      //       <button onClick={joinRoom}>Join A Room</button>
      //     </div>
      //   ) : (
      //     <ChatBox socket={"socket"} username={username} room={room} />
      //   )}
      // </div>

      <img src={image} style={{width: "100%", height: "auto"}}/>
    );
}

export default Chat