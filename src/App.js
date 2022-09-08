import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Session from './session/Session'
import Home from './website/home/Home';
import Login from './website/login/Login';
import Register from './website/register/Register';
import Welcome from './website/welcome/Welcome';
import Join from './website/join/Join';

// Website endpoints
// / - welcome page. Welcome, demo video, sign up
//     buttons for sign up, login, join session, click logo for home, home button for session page if logged in
// /join - join existion queue
// /session/sessionID - session for ID
// /login - login to account
// /register - create account
// /home - account overview, current sessions, button to create new session, button to link spotify

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/join' element={<Join/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/session' element={<Session/>} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
