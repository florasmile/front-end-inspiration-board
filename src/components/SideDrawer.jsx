import PropTypes from 'prop-types';
import './SideDrawer.css';
import { useState } from 'react';

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
    return (
        <aside className={`side-drawer ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={closeDrawer}>❌</button>
            {/* Board section */}
        <div>
            {
            !showBoardForm && 
            <button onClick={toggleBoardFormDisplay}>+ Create a new board</button>  
            } 
            {showBoardForm && 
            <NewBoardForm onPostBoard={onPostBoard} isOpen={isOpen}/>
            }
            {showBoardForm && 
            <button onClick={toggleBoardFormDisplay}>hide board form</button>
            }
        </div>
        <div>
            {
            !showCardForm && 
                <button onClick={toggleCardFormDisplay}>+ Create a new Card</button>  
            } 
            {showCardForm && 
                <NewCardForm onPostCard={onPostCard} isOpen={isOpen}/>
            }
            {showCardForm && 
            <button onClick={toggleCardFormDisplay}>hide card form</button>}
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
