import PropTypes from 'prop-types';

const Board = ({ id, title, displayBoard }) => {

  return (
    <li className="boards__item">
      <button
        onClick={() => displayBoard(id)}
      >
        {title}
      </button>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  displayBoard: PropTypes.func.isRequired,
};

export default Board;