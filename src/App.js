import './App.css';
import GameRow from './components/GameRow';

function App() {
  return (
    <div class="content">
      <div id="header">
        <h1>Test Your Color Perception</h1>
        <h2>Click and Drag the tiles so the colors appear in gradient order</h2>
      </div>
      <GameRow/>
      <hr/>
      <button id="next-round">Next Round of Colors</button>
    </div>
  );
}

export default App;
