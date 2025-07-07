import PropTypes from 'prop-types';
import './SideDrawer.css';
import { useState, useEffect } from 'react';

import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';
import MoodSelector from './MoodSelector';

const SideDrawer = ({ onPostBoard, onPostCard, onChangeMood, isOpen, closeDrawer }) => {
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [showCardForm, setShowCardForm] = useState(false);
    const toggleBoardFormDisplay = () => {
        setShowBoardForm(showBoardForm => !showBoardForm);
    };
    const toggleCardFormDisplay = () => {
        setShowCardForm(showCardForm => !showCardForm);
    };
    useEffect(()=> {
        setShowBoardForm(false);
        setShowCardForm(false);
    }, [isOpen]
    );
    return (
        <aside className={`side-drawer ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={closeDrawer}>❌</button>
            {/* Board section */}
        <div className="new-board-section">
            {
            !showBoardForm && 
            <button onClick={toggleBoardFormDisplay}>+ new board</button>  
            } 
            {showBoardForm && 
            <NewBoardForm onPostBoard={onPostBoard} isOpen={isOpen} toggleNewBoardForm={toggleBoardFormDisplay}/>
            }
        </div>
        <div className="new-card-section">
            {
            !showCardForm && 
                <button onClick={toggleCardFormDisplay}>+ new Card</button>  
            } 
            {showCardForm && 
                <NewCardForm onPostCard={onPostCard} isOpen={isOpen} toggleNewCardForm={toggleCardFormDisplay}/>
            }

        </div>
            {/* MOOD SECTION */}
            <MoodSelector onChangeMood={onChangeMood} />
        </aside>
    );
};

SideDrawer.propTypes = {
    onPostBoard: PropTypes.func.isRequired,
    onPostCard: PropTypes.func.isRequired,
    onChangeMood: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
};

export default SideDrawer;
