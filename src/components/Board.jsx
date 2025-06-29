import PropTypes from 'prop-types';

const Board = ({ id, title, displayBoard, deleteBoard }) => {

  return (
    <li className="boards__item">
      <button
        className="board"        // ← добавляем
        onClick={() => displayBoard(id)}
      >
        {title}
      </button>
      <button onClick={() => deleteBoard(id)}>❌</button>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  displayBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired
};

export default Board;