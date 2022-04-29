import logo from './logo.svg';
import './App.css';

// Queue Display:
  // Top: Music player
  // Left third/fifth: logo at top and join code
  // Right third/fifth: Ad
  // Middle: Queue
// Mobile 
  // Top: Music player
  // Middle: queue and vote
  // Bottom: search for new songs

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
