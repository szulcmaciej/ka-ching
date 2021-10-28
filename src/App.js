import './App.css';
import Setup from './components/Setup/Setup';
import StopWatch from './components/StopWatch/StopWatch';

function App() {
  return (
    <div className="App">
      <div class="clock">
        <Setup />
        <StopWatch />
      </div>
    </div>
  );
}

export default App;
