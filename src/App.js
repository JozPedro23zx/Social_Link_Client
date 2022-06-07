import { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Axios from "axios";

import './customStyles/App.css';
import './customStyles/Navbar.css'
import './customStyles/Chat.css'
import './customStyles/Login.css'
import './customStyles/Profile.css'
import './customStyles/Modal.css'
import './customStyles/Settings.css'
import './customStyles/commentaryBox.css'
import './customStyles/commentaryList.css'
import './customStyles/inputBox.css'
import './customStyles/postBox.css'


import './customStyles/responsive.css';

import Navbar from './components/Navbar';
import Home from './components/Home'
import Profile from './components/Profile'
import Chat from './components/Chat'
import Comments from './components/Comments';
import Login from './components/Login';
import Settings from './components/Settings'

function App() {
  const [authenticateUser, setAuth] = useState(0)
  const [postContent, setPostContent] = useState('empty')

  async function currentUser(){
    let token = localStorage.getItem('token')
    console.log("token", token)
    await Axios({
      method: "POST",
      data:{
        token
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_API}/user`,
    }).then((res) => {
      setAuth(parseInt(res.data));
    });
  }

async function getToken(newToken){
  localStorage.setItem("token", newToken)
  currentUser()
}

  useEffect(() =>{
    currentUser()
  }, [])

  function searchPost(dataSearch){
    setPostContent(dataSearch.target.value)
  }
  
  if(authenticateUser){
    return (
      <div className='main'>
        <BrowserRouter>
          <div className='content'>  
            <Routes>
              <Route exact path='/' element={<Home userId={authenticateUser} postContent={postContent} />} />
              
              <Route path='/profile/:userId' element={<Profile userId={authenticateUser} />} />
  
              <Route path='/chat' element={<Chat userId={authenticateUser} />} />
  
              <Route path='/post/:postId' element={<Comments userId={authenticateUser} />} />

              <Route path='/settings' element={<Settings userId={authenticateUser} />} />
            </Routes>
          </div>
          
          <div className='navbar'>
            <Navbar userId={authenticateUser} searchPost={searchPost}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }else{
    return <Login currentUser={currentUser} getToken={getToken}/>
  }
}

export default App;
