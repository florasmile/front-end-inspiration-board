import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useState, useEffect } from 'react';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
// import BOARDS from './boards.json';
// import CARDS from './cards.json';
import { getAllBoardsApi, postBoardApi } from './services/boardApi';
import { postCardApi, getCardsApi, deleteCardApi, addCardLikesApi } from './services/cardApi';


const convertCardData = ({ id, likes_count, message }) => {
  const converted = { id, message, likeCount: likes_count };
  return converted;
}
function App() {
  const [boards, setBoards] = useState([]);
  const [curBoard, setCurBoard] = useState({
    title: '',
    owner: '',
  });
  const [cards, setCards] = useState([]);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const getAllBoards = async () => {
    //call Api to get all boards
    // use data from backend to set boards
    try {
      const data = await getAllBoardsApi();
      console.log(data);
      setBoards(data);
    } catch(error){
      console.log('failed to get Boards from server', error);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  useEffect(() => {
    if (boards.length > 0) {
      setCurBoard(boards[0]);
      console.log(boards[0]);
    }
  }, [boards]);

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curBoard]);

  
  const displayBoard = (id) => {
    // when a board is selected, we want to display its title, owner's name, and all cards;
    setCurBoard(() => {
      const result = boards.filter(board => board.id === id)
      console.log(result[0]);
      return result[0];
    });
    // send API calls to get a list of cards of current board to display; and call setCards

  };

  const increaseLikeCount = async (id) => {
    // when user click +1, we make a patch request to backend API to increase the likeCount of a card by 1
    try {
      const data =  await addCardLikesApi(id);
      console.log(data);
      fetchCards();
      console.log(cards);
    } catch(error) {
      console.log(error);
    };
  };
  
  const postBoard = async (newBoardData) => {
    try {
      const data = await postBoardApi(newBoardData);
      setBoards(prevBoards => [...prevBoards, data]);
      setCurBoard(boards[0]);
    } catch(error){
      console.log('failed to create a new board', error);
    }
    toggleBoardFormDisplay();
  };

  const postCard = async (newCardData) => {
    // make a call to backend to create a new card
    try {
      await postCardApi(newCardData, curBoard.id);
      // setCurBoard(prevBoard => ({...prevBoard}));//getCards from backend to trigger rerender
      fetchCards();
    } catch(error) {
      console.log(error);
    }
    toggleCardFormDisplay();
  }

  const fetchCards = async () => {
    if (curBoard && curBoard.id) {
        try{
          const fetchCards = await getCardsApi(curBoard.id);
          setCards(fetchCards.map(card => convertCardData(card)));
        } catch (error) {
          console.log(error);
          setCards([]);
        }
      }
  };

  const deleteCard = async (id) => {
    // when user clicks "delete" button, we make a delete request to backend API to delete a card
    try {
      await deleteCardApi(id)
      await fetchCards();
    } catch(error) {
      console.log(error)
    }
  };

  const toggleBoardFormDisplay = () => {
    setShowBoardForm(showBoardForm => !showBoardForm);
  };

  const toggleCardFormDisplay = () => {
    setShowCardForm(showCardForm => !showCardForm);
  };

  return (
    <main className="container-fluid vh-100"> 
    <div className="row h-100 g-3">
      {/* Left Column */}
      <section className="col-md d-flex flex-column">
         {/* Row 1 - Header */}
        <h1 className="flex-shrink-0">Boards</h1>
          {/* Row 2 - Content (will expand) */}
        <div className="flex-grow-1 overflow-auto">
          <BoardList boards={boards} displayBoard={displayBoard}/>
        </div>
          {/* Row 3 * can add className="flex-shrink-0" */}
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

      {/* Right Column */}
      <section className="col-md d-flex flex-column">
         {/* Row 1 - Header */}
        <h3 className="flex-shrink-0">{curBoard.title} - {curBoard.owner}</h3>
         {/* Row 2 - Content (will expand) */}
        <div className="flex-grow-1 overflow-auto">
          <CardList 
          cards={cards} 
          increaseLikeCount={increaseLikeCount}
          deleteCard={deleteCard}
        />        
        </div>
        {/* Row 3*/}
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
    </div>
      
    </main>
  )
}

export default App;
