import PropTypes from 'prop-types';
import './Board.css';

const Board = ({ id, title, displayBoard, deleteBoard }) => {

  return (
    <li className="board-wrapper">
      <button className="board" onClick={() => displayBoard(id)}>
        {title}
      </button>
      <button className="delete-button" onClick={() => deleteBoard(id)}>
        ❌
      </button>
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