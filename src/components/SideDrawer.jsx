import PropTypes from 'prop-types';
import './SideDrawer.css';
import { useState, useEffect } from 'react';

import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';
import MoodSelector from './MoodSelector';

const SideDrawer = ({ onPostBoard, onPostCard, onChangeMood, isOpen, closeDrawer, mood}) => {
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const [submitBoard, setSubmitBoard] = useState(false);
  const [resetBoard, setResetBoard] = useState(false);

  const [submitCard, setSubmitCard] = useState(false);
  const [resetCard, setResetCard] = useState(false);

  useEffect(() => {
    setShowBoardForm(false);
    setShowCardForm(false);
    setShowMoodSelector(false);
  }, [isOpen]
  );

  return (
    <aside className={`side-drawer ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={closeDrawer}>❌</button>

      {/* === CREATE BOARD === */}
      <div className="drawer-section">
        {!showBoardForm ? (
          <button className="section-toggle" onClick={() => setShowBoardForm(true)}>
            <span className="plus-icon">+</span>
            <span className="section-label">Create a Board</span>
          </button>
        ) : (
          <div className="form-section">
            <NewBoardForm
              onPostBoard={onPostBoard}
              isOpen={isOpen}
              submitBoard={submitBoard}
              setSubmitBoard={setSubmitBoard}
              resetBoard={resetBoard}
              setResetBoard={setResetBoard}
            />
            <div className="form-controls">
              <button
                className="circle-btn"
                onClick={() => setSubmitBoard(true)}
                title="Submit"
              >
                ✔
              </button>
              <button
                className="circle-btn"
                onClick={() => setResetBoard(true)}
                title="Reset"
              >
                ↺
              </button>
              <button
                className="circle-btn"
                onClick={() => setShowBoardForm(false)}
                title="Hide"
              >
                −
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === CREATE CARD === */}
      <div className="drawer-section">
        {!showCardForm ? (
          <button className="section-toggle" onClick={() => setShowCardForm(true)}>
            <span className="plus-icon">+</span>
            <span className="section-label">Create a Card</span>
          </button>
        ) : (
          <div className="form-section">
            <NewCardForm
              onPostCard={onPostCard}
              isOpen={isOpen}
              submitCard={submitCard}
              setSubmitCard={setSubmitCard}
              resetCard={resetCard}
              setResetCard={setResetCard}
            />
            <div className="form-controls">
              <button
                className="circle-btn"
                onClick={() => setSubmitCard(true)}
                title="Submit"
              >
                ✔
              </button>
              <button
                className="circle-btn"
                onClick={() => setResetCard(true)}
                title="Reset"
              >
                ↺
              </button>
              <button
                className="circle-btn"
                onClick={() => setShowCardForm(false)}
                title="Hide"
              >
                −
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === MOOD SELECTOR === */}
      <div className="drawer-section">
        {!showMoodSelector ? (
          <button className="section-toggle" onClick={() => setShowMoodSelector(true)}>
            <span className="plus-icon">+</span>
            <span className="section-label">Change the Mood</span>
          </button>
        ) : (
          <div className="form-section">
            <MoodSelector onChangeMood={onChangeMood} currentMood={mood} />
            <div className="form-controls">
              <button
                className="circle-btn"
                onClick={() => setShowMoodSelector(false)}
                title="Hide"
              >
                −
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

SideDrawer.propTypes = {
  onPostBoard: PropTypes.func.isRequired,
  onPostCard: PropTypes.func.isRequired,
  onChangeMood: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  mood: PropTypes.string.isRequired
};

export default SideDrawer;