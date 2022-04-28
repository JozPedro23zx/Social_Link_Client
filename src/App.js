import { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Axios from "axios";

import './customStyles/App.css';

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

  function currentUser(){
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8000/user",
    }).then((res) => {
      setAuth(parseInt(res.data));
    });
  }

  useEffect(() =>{
    currentUser()
  }, [])

  function searchPost(dataSearch){
    console.log(dataSearch.target.value)
    setPostContent(dataSearch.target.value)
  }
  
  if(authenticateUser){
    return (
      <div className='main'>
        <BrowserRouter>
          <div className='content'>  
            <Routes>
              <Route exact path='/' element={<Home userId={authenticateUser} postContent={postContent} searchPost={searchPost}/>} />
              
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
    return <Login currentUser={currentUser}/>
  }
}

export default App;
