import { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, message, likeCount, increaseLikeCount, deleteCard, updateCardMessage }) => {
  const [editing, setEditing] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const txt = e.target.value.trim();
      if (txt && txt !== message) updateCardMessage(id, txt);
      setEditing(false);
    }
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <li className={`card-box${editing ? ' editing' : ''}`}>
      {editing
        ? <input className="card-edit-input" defaultValue={message} onKeyDown={handleKeyDown} onBlur={() => setEditing(false)} autoFocus />
        : <p className="card-message">{message}</p>}
      <div className="card-actions">
        <span className="like-count">❤️ {likeCount}</span>
        <button className="like-button" onClick={() => increaseLikeCount(id)}>➕</button>
        <button className="delete-button" onClick={() => deleteCard(id)} title="Delete">❌</button>
        {!editing && (
          <button className="edit-button" onClick={() => setEditing(true)} title="Edit">✎</button>
        )}
      </div>
    </li>
  )
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  increaseLikeCount: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  updateCardMessage: PropTypes.func.isRequired,
};

export default Card;