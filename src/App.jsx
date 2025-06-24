import { useState } from 'react';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import BOARDS from './boards.json';

function App() {
  const [count, setCount] = useState(0)
  const [boards, setBoards] = useState(BOARDS)

  return (
    <>
      <header>
        <h1>Inspiration Board</h1>
      </header>
      <BoardList boards={boards}/>
      <CardList />
      <NewBoardForm />
      <NewCardForm />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App;
