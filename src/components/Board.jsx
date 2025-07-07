import { useState } from 'react';
import PropTypes from 'prop-types';
import './Board.css';

const Board = ({ id, title, displayBoard, deleteBoard, updateBoardTitle }) => {
  const [editing, setEditing] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const txt = event.target.value.trim();
      if (txt && txt !== title) updateBoardTitle(id, txt);
      setEditing(false);
    }
    if (event.key === 'Escape') setEditing(false);
  };

  return (
    <li className={`board-wrapper${editing ? ' editing' : ''}`}>
      {editing
        ? <input
          className="board-edit-input"
          defaultValue={title}
          onKeyDown={handleKeyDown}
          onBlur={() => setEditing(false)}
          autoFocus
        />
        : <button className="board" onClick={() => displayBoard(id)}>{title}</button>}
      {!editing && (
        <div className="board-actions">
          <button
            className="edit-button"
            onClick={(e) => { e.stopPropagation(); setEditing(true); }}
            title="Edit"
          >✎</button>
          <button
            className="delete-button"
            onClick={(e) => { e.stopPropagation(); deleteBoard(id); }}
            title="Delete"
          >❌</button>
        </div>
      )}
  </li>
  );
}

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  displayBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  updateBoardTitle: PropTypes.func.isRequired,
};
export default Board;