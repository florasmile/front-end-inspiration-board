import PropTypes from 'prop-types';
import './SideDrawer.css';
import { useState } from 'react';

const SideDrawer = ({ onPostBoard, onPostCard, onChangeMood, isOpen, closeDrawer, curBoard }) => {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardOwner, setBoardOwner] = useState('');
    const [cardMessage, setCardMessage] = useState('');

    const moodOptions = [
        'anger', 'black&white', 'default', 'disgust', 'faces', 'fear',
        'happiness', 'neutral', 'pride', 'sadness', 'surprise', 'tnx'
    ];

    const handleBoardSubmit = () => {
        if (!boardTitle || !boardOwner) return;
        onPostBoard({ title: boardTitle, owner: boardOwner });
        setBoardTitle('');
        setBoardOwner('');
    };

    const handleCardSubmit = () => {
        if (!cardMessage || !curBoard?.id) return;
        onPostCard({ message: cardMessage, boardId: curBoard.id });
        setCardMessage('');
    };

    const handleMoodChange = (event) => {
        onChangeMood(event.target.value);
    };

    return (
        <aside className={`side-drawer ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={closeDrawer}>✖</button>

            {/* BOARD SECTION */}
            <section>
                <h2>+ New Board</h2>
                <label>Title
                    <input
                        type="text"
                        placeholder="title cannot be empty"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                    />
                </label>
                <label>Owner
                    <input
                        type="text"
                        placeholder="owner cannot be empty"
                        value={boardOwner}
                        onChange={(e) => setBoardOwner(e.target.value)}
                    />
                </label>
                <div className="icon-buttons">
                    <button onClick={handleBoardSubmit}>✅</button>
                    <button onClick={() => {
                        setBoardTitle('');
                        setBoardOwner('');
                    }}>❌</button>
                </div>
            </section>

            {/* CARD SECTION */}
            <section>
                <h2>+ New Card</h2>
                <label>Message
                    <input
                        type="text"
                        placeholder="message cannot be empty"
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                    />
                </label>
                <div className="icon-buttons">
                    <button onClick={handleCardSubmit}>✅</button>
                    <button onClick={() => setCardMessage('')}>❌</button>
                </div>
            </section>

            {/* MOOD SECTION */}
            <section>
                <h2>+ Mood</h2>
                <label>Current Mood
                    <select onChange={handleMoodChange} defaultValue="">
                        <option value="" disabled>choose a mood</option>
                        {moodOptions.map(mood => <option key={mood} value={mood}>{mood}</option>)}
                    </select>
                </label>
            </section>
        </aside>
    );
};

SideDrawer.propTypes = {
    onPostBoard: PropTypes.func.isRequired,
    onPostCard: PropTypes.func.isRequired,
    onChangeMood: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    curBoard: PropTypes.object.isRequired,
};

export default SideDrawer;
