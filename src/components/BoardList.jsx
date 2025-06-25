import PropTypes from 'prop-types';
import Board from './Board.jsx';

const BoardList = ({ boards, displayBoard }) => {
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <Board 
          key={board.id}
          id={board.id}
          title={board.title}
          // owner={board.owner}
          displayBoard={displayBoard}
        />
      );
    })
  };
  return <ul>
    { getBoardListJSX(boards)}
  </ul>
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
};

export default BoardList;