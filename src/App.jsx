import { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import MoodSelector from './components/MoodSelector';
import SideDrawer from './components/SideDrawer';
import { getAllBoardsApi, postBoardApi, deleteBoardApi, updateBoardApi } from './services/boardApi';
import { postCardApi, getCardsApi, deleteCardApi, addCardLikesApi, updateCardApi } from './services/cardApi';

const kDefaultBackgroundImg = `url(${new URL('./assets/backgrounds/default.jpg', import.meta.url).href})`;

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
  // const [showBoardForm, setShowBoardForm] = useState(false);
  // const [showCardForm, setShowCardForm] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(kDefaultBackgroundImg);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const getAllBoards = async () => {
    //call Api to get all boards
    // use data from backend to set boards
    try {
      const data = await getAllBoardsApi();
      setBoards(data);
    } catch (error) {
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
      const data = await addCardLikesApi(id);
      console.log('data from backend', data);
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === id ? { ...card, likeCount: card.likeCount + 1 } : card
        )
      );
      // console.log(cards);
    } catch (error) {
      console.log(error);
    };
  };

  const updateCardMessage = async (id, newMessage) => {
    try {
      await updateCardApi(id, newMessage);
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === id ? { ...card, message: newMessage } : card));
    } catch (error) {
      console.log(error);
    }
  };

  const updateBoardTitle = async (id, newTitle) => {
    try {
      await updateBoardApi(id, newTitle);
      setBoards(prevBoards =>
        prevBoards.map(board =>
          board.id === id ? { ...board, title: newTitle } : board));
    } catch (error) {
      console.log(error);
    }
  };

  const postBoard = async (newBoardData) => {
    try {
      const data = await postBoardApi(newBoardData);
      setBoards(prevBoards => [...prevBoards, data]);
      setCurBoard(boards[0]);
    } catch (error) {
      console.log('failed to create a new board', error);
    }
    // toggleBoardFormDisplay();
  };

  //   const handleMoodChange = (newMood) => {
  //   setMood(newMood);
  // };

  const postCard = async (newCardData) => {
    // make a call to backend to create a new card
    try {
      await postCardApi(newCardData, curBoard.id);
      // setCurBoard(prevBoard => ({...prevBoard}));//getCards from backend to trigger rerender
      fetchCards();
    } catch (error) {
      console.log(error);
    }
    // toggleCardFormDisplay();
  }

  const fetchCards = async () => {
    if (curBoard && curBoard.id) {
      try {
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
    } catch (error) {
      console.log(error)
    }
  };

  // const toggleBoardFormDisplay = () => {
  //   setShowBoardForm(showBoardForm => !showBoardForm);
  // };

  // const toggleCardFormDisplay = () => {
  //   setShowCardForm(showCardForm => !showCardForm);
  // };


  const changeMood = (moodName) => {
    console.log(moodName);
    setBackgroundImg(`url(${new URL(`./assets/backgrounds/${moodName}.jpg`, import.meta.url).href})`);
  };

  const deleteBoard = async (id) => {
    try {
      await deleteBoardApi(id);
      await getAllBoards();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <div className="app-wrapper">
    // <div className={`app-wrapper ${mood}`}>
    <>
      <div className="app-wrapper" >
        <Header onOpenDrawer={() => setDrawerOpen(true)} />
        {/* <button className="open-drawer-button" onClick={() => setDrawerOpen(true)}>☰ Menu</button> */}
        <SideDrawer
          isOpen={drawerOpen}
          closeDrawer={() => setDrawerOpen(false)}
          onPostBoard={postBoard}
          onPostCard={postCard}
          onChangeMood={changeMood}
        // curBoard={curBoard}
        />
        <main className="main-layout">
          <section className="board-section">
            <h1 className="board-title">Boards</h1>
            <div className="board-container">
              <BoardList
                boards={boards}
                displayBoard={displayBoard}
                deleteBoard={deleteBoard}
                updateBoardTitle={updateBoardTitle}
              />
            </div>          
          </section>
          <section
            className="card-section"
            style={{
              backgroundImage: backgroundImg,
            }}
          >
            <div className="card-section-header">
              <h3 className="card-title">{curBoard.title} by {curBoard.owner}</h3>
            </div>
            <div className="card-container"></div>
            <CardList
              cards={cards}
              increaseLikeCount={increaseLikeCount}
              deleteCard={deleteCard}
              updateCardMessage={updateCardMessage}
            />
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App;
