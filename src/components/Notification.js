import React, { useState, useEffect } from 'react';
import Axios from 'axios'

function Notification(props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_API}/getMessageBox/${props.userId}`);
        const messageBox = await response.json();
        messageBox.forEach((message) => {
          displayNotification({idMessage: message.id_message, idSender: message.id_sender, type: message.type_message})
        });
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchData();

    props.socket.on("get_notification", async(data) => {
      displayNotification(data)
    });
  }, [props.socket, props.userId]);

  const displayNotification = async (data) =>{
      let action;
      let dataUser = await fetch(`http://${process.env.REACT_APP_API}/getUser/${data.idSender}`)
      let user = await dataUser.json()

      if (data.type === "chat") {
        action = "sent you a message";
      } else if (data.type === "comment") {
        action = "commented on your post";
      }
      
      const newNotification = {
        idSender: data.idSender,
        type: data.type,
        message: `${user.name} ${action}.`,
        count: 1
      };
    
      setNotifications((prevNotifications) => {
        const existingNotification = prevNotifications.find(
          (notification) => notification.message === newNotification.message
        );
    
        if (existingNotification) {
          existingNotification.count += 1;
          return [...prevNotifications];
        } else {
          return [...prevNotifications, newNotification];
        }
      });
  }

  const handleRead = async (index, idSender, typeMessage) => {
    console.log(notifications)
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(index, 1);
      return updatedNotifications;
    });

    await Axios({
      method: "POST",
      data:{
        idSender,
        typeMessage
      },
      withCredentials: true,
      url: `http://${process.env.REACT_APP_API}/markAsRead`,
    })
  };


  return (
    <div>
      <button onClick={() => {setShowNotifications(!showNotifications)}}>
        {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
      </button>
      {showNotifications && (
        <div className="notification-window">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div className="notification-item">
                <span className="notification">
                  {notification.message} {notification.count > 1 && `(${notification.count})`}
                </span>
                <span className='read' onClick={() => handleRead(index, notification.idSender, notification.type)}>X</span>
              </div>
            ))
          ) : (
            <div className="notification-item">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
