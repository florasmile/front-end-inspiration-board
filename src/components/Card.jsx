import './Card.css';
import PropTypes from 'prop-types';
const Card = ({ id, message, likeCount, increaseLikeCount, deleteCard}) => {

  return <li className="card h-100 cardContainer">
    <p>{message}</p>
    <div>
      <span className="likeCount">❤️ {likeCount}</span>
      <button className="likeButton" onClick={() => increaseLikeCount(id)}>➕</button>
      <button className="deleteButton" onClick={() => deleteCard(id)} title="Delete">❌</button>
    </div>
  </li>;
};


Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  increaseLikeCount:PropTypes.func.isRequired,
  deleteCard:PropTypes.func.isRequired,
};

export default Card;