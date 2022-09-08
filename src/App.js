import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Session from './session/Session'

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
    <>
      <Session />
    </>  );
}

export default App;
