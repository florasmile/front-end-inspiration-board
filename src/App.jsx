import { useState } from 'react';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import BOARDS from './boards.json';
import CARDS from './cards.json';

function App() {
  const [boards, setBoards] = useState(BOARDS)
  const [curBoard, setCurBoard] = useState(boards[0])
  const [cards, setCards] = useState(CARDS)

  const displayBoard = (id) => {
    // when a board is selected, we want to display its title, owner's name, and all cards;
    setCurBoard(() => {
      const result = boards.filter(board => board.id === id)
      console.log(result[0]);
      return result[0];
    });
    // send API calls to get a list of cards of current board to display; and call setCards

  };
  return (
    <>
      <header>
        <h1>Inspiration Board</h1>
      </header>
      <BoardList boards={boards} displayBoard={displayBoard}/>
      <section>
        <h2>Current Board</h2>
        <p>{curBoard.title} - {curBoard.owner}</p>
        <CardList cards={cards}/>
      </section>      
      <NewBoardForm />
      <NewCardForm />
      <div className="card">
      </div>
    </>
  )
}

export default App;
