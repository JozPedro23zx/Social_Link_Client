import './customStyles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Profile from './components/Profile'
import Chat from './components/Chat'
import Comments from './components/Comments';
import Login from './components/Login';

function App() {
  const variavel = 0

  if(variavel === 1){
    return (
      <div className='main'>
        <BrowserRouter>
          <div className='content'>  
            <Routes>
              <Route exact path='/' element={<Home />}/>
              
              <Route path='/profile/:userId' element={<Profile />}/>
  
              <Route path='/chat' element={<Chat />}/>
  
              <Route path='/post/:postId' element={<Comments />}/>
            </Routes>
          </div>
          
          <div className='navbar'>
            <Navbar />
          </div>
        </BrowserRouter>
      </div>
    );
  }else{
    return <Login />
  }
}

export default App;
