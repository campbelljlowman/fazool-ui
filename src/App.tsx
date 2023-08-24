import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Session from './session/Session'
import Home from './website/home/Home';
import Login from './website/login/Login';
import Register from './website/register/Register';
import Welcome from './website/welcome/Welcome';
import Join from './website/join/Join';
import SpotifyCallback from './website/callback/SpotifyCallback';
import { ThemeProvider } from './components/theme-provider';

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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/join' element={<Join />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/session' >
                        <Route path=':sessionID' element={<Session />} />
                    </Route>
                    <Route path='/callback' element={<SpotifyCallback />} />
                    <Route path="*" element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
