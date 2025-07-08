import PropTypes from 'prop-types';
import './SideDrawer.css';
import { useState, useEffect, useRef } from 'react';

import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';
import MoodSelector from './MoodSelector';

const SideDrawer = ({ onPostBoard, onPostCard, onChangeMood, isOpen, closeDrawer }) => {
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const submitBoardRef = useRef();
  const resetBoardRef = useRef();

  const submitCardRef = useRef();
  const resetCardRef = useRef();

  const toggleBoardFormDisplay = () => setShowBoardForm(prev => !prev);
  const toggleCardFormDisplay = () => setShowCardForm(prev => !prev);
  const toggleMoodSelectorDisplay = () => setShowMoodSelector(prev => !prev);

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
      <button className="section-toggle" onClick={toggleBoardFormDisplay}>
        <span className="plus-icon">+</span>
        <span className="section-label">Create a Board</span>
      </button>
    ) : (
      <div className="form-section">
        <NewBoardForm
          onPostBoard={onPostBoard}
          isOpen={isOpen}
          toggleNewBoardForm={toggleBoardFormDisplay}
          forwardedSubmit={submitBoardRef}
          forwardedReset={resetBoardRef}
        />
        <div className="form-controls">
          <button
            className="circle-btn"
            onClick={() => submitBoardRef.current?.()}
            title="Submit"
          >
            ✔
          </button>
          <button
            className="circle-btn"
            onClick={() => resetBoardRef.current?.()}
            title="Reset"
          >
            ↺
          </button>
          <button
            className="circle-btn"
            onClick={toggleBoardFormDisplay}
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
      <button className="section-toggle" onClick={toggleCardFormDisplay}>
        <span className="plus-icon">+</span>
        <span className="section-label">Create a Card</span>
      </button>
    ) : (
      <div className="form-section">
        <NewCardForm
          onPostCard={onPostCard}
          isOpen={isOpen}
          forwardedSubmit={submitCardRef}
          forwardedReset={resetCardRef}
        />
        <div className="form-controls">
          <button
            className="circle-btn"
            onClick={() => submitCardRef.current?.()}
            title="Submit"
          >
            ✔
          </button>
          <button
            className="circle-btn"
            onClick={() => resetCardRef.current?.()}
            title="Reset"
          >
            ↺
          </button>
          <button
            className="circle-btn"
            onClick={toggleCardFormDisplay}
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
      <button className="section-toggle" onClick={toggleMoodSelectorDisplay}>
        <span className="plus-icon">+</span>
        <span className="section-label">Change the Mood</span>
      </button>
    ) : (
      <div className="form-section">
        <MoodSelector onChangeMood={onChangeMood} />
        <div className="form-controls">
          <button
            className="circle-btn"
            onClick={toggleMoodSelectorDisplay}
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
};

export default SideDrawer;