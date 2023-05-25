import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios'
import closeIcon from '../images/closeIcon.png'

function Notification(props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const hasUnreadNotification = notifications.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_API}/getMessageBox/${props.userId}`);
        const messageBox = await response.json();
        messageBox.forEach((message) => {
          displayNotification({idSender: message.id_sender, type: message.type_message})
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
    <div className='notifications'>
      <Helmet>
        <title>{notifications.length > 0 ? `(${notifications.length}) Social Link` : 'Social Link'}</title>
      </Helmet>
      <div onClick={() => setShowNotifications(!showNotifications)}>
        <svg
          width={'40px'}
          height={'40px'}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 510 510"
          className="notification-icon"
        >
          <path
            d="m 255,510 c 28.05,0 51,-22.95 51,-51 l -102,0 c 0,28.05 22.95,51 51,51 z m 165.75,-153 0,-140.25 C 420.75,137.7 367.2,73.95 293.25,56.1 l 0,-17.85 C 293.25,17.85 275.4,0 255,0 234.6,0 216.75,17.85 216.75,38.25 l 0,17.85 C 142.8,73.95 89.25,137.7 89.25,216.75 l 0,140.25 -51,51 0,25.5 433.5,0 0,-25.5 -51,-51 z"
            fill="black"
          />
        </svg>
        
        {hasUnreadNotification && <div className="notification-indicator"></div>}
      </div>
      {showNotifications && (
        <div className="notification-window">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div className="notification-item">
                <span className="notification">
                  {notification.message} {notification.count > 1 && `(${notification.count})`}
                </span>
                <span className='read' onClick={() => handleRead(index, notification.idSender, notification.type)}>
                  <img src={closeIcon} alt="Close" className="close-icon" />
                </span>
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
