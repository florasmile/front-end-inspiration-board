import PropTypes from 'prop-types';
import Board from './Board.jsx';
import './BoardList.css';

const BoardList = ({ boards, displayBoard, deleteBoard }) => {
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <Board
          key={board.id}
          id={board.id}
          title={board.title}
          // owner={board.owner}
          displayBoard={displayBoard}
          deleteBoard={deleteBoard}
        />
      );
    })
  };
  return (
    <ul className="board-list">
      {getBoardListJSX(boards)}
    </ul>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      // owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  displayBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired
};

export default BoardList;