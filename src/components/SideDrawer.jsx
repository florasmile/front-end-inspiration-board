import PropTypes from 'prop-types';
import './SideDrawer.css';
// import { useState } from 'react';

import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';
import MoodSelector from './MoodSelector';

const SideDrawer = ({ onPostBoard, onPostCard, onChangeMood, isOpen, closeDrawer }) => {

    return (
        <aside className={`side-drawer ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={closeDrawer}>❌</button>
            {/* Board section */}
            <NewBoardForm onPostBoard={onPostBoard} isOpen={isOpen} />
            <NewCardForm onPostCard={onPostCard}/>
            {/* Card section */}
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
