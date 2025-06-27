import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useState } from 'react';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import Header from './components/Header';
import Footer from './components/Footer';
import BOARDS from './boards.json';
import CARDS from './cards.json';

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [curBoard, setCurBoard] = useState(boards[0]);
  const [cards, setCards] = useState(CARDS);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

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
    });
    toggleBoardFormDisplay();
  };

  const postCard = (newCardData) => {
    // make a call to backend to create a new card
    // then reset cards to trigger to rerender
    const newCard = { ... newCardData, likeCount: 0}
    setCards(cards => {
      return [ ...cards, newCard]
    });
    toggleCardFormDisplay();
  };

  const toggleBoardFormDisplay = () => {
    setShowBoardForm(showBoardForm => !showBoardForm);
  };

  const toggleCardFormDisplay = () => {
    setShowCardForm(showCardForm => !showCardForm);
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-layout">
        <section className="board-section">
          <h1>Boards</h1>
          <BoardList boards={boards} displayBoard={displayBoard}/>
          <div>
            {
              !showBoardForm && 
                <button onClick={toggleBoardFormDisplay}>+ Create a new board</button>  
            } 
            {showBoardForm && 
              <NewBoardForm onPostBoard={postBoard}/>
            }
          </div>
        </section>

        <section className="card-section">
          <h3>{curBoard.title} - {curBoard.owner}</h3>
          <CardList 
            cards={cards} 
            increaseLikeCount={increaseLikeCount}
            deleteCard={deleteCard}
          />        
          <div>
            {
              !showCardForm && 
                <button onClick={toggleCardFormDisplay}>+ Create a new Card</button>  
            } 
            {showCardForm && 
              <NewCardForm onPostCard={postCard}/>
            }
          </div>
        </section>  
      </main>
      <Footer />
    </div>
  )
}

export default App;
