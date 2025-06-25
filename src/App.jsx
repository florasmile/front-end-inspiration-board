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

  const increaseLikeCount = (id) => {
    // when user click +1, we make a patch request to backend API to increase the likeCount of a card by 1
    // then we reset the cards by iterate through cards and find the matching card, update the reference of cards, trigger rerender of cardlist
    setCards(cards => {
      return cards.map(card => {
        if (card.id === id){
          return { ...card, likeCount: card.likeCount+1 }
        } else {
          return card;
        }
      });
    });
  };
  const deleteCard = (id) => {
    // when user clicks "delete" button, we make a delete request to backend API to delete a card
    // front end: we need to reset cards, trigger rerender
    setCards(cards => {
      return cards.filter(card => card.id !== id);
    });
  };
  const postBoard = (formData) => {
    // make a post request to backend API to create a new board
    // reset boards to trigger rerender
    setBoards(boards => {
      return [ ...boards, formData]
    })
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
        <CardList 
          cards={cards} 
          increaseLikeCount={increaseLikeCount}
          deleteCard={deleteCard}
        />
      </section>      
      <NewBoardForm onPostBoard={postBoard}/>
      <NewCardForm />
      <div className="card">
      </div>
    </>
  )
}

export default App;
