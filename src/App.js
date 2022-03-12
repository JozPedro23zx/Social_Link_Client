import './customStyles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Profile from './components/Profile'
import Chat from './components/Chat'


function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <div className='content'>  
          <Routes>
            <Route exact path='/' element={<Home />}/>
            
            <Route path='/profile' element={<Profile />}/>

            <Route path='/chat' element={<Chat />}/>
          </Routes>
        </div>
        
        <div className='navbar'>
          <Navbar />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
