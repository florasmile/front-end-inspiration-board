import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, message, likeCount, increaseLikeCount, deleteCard }) => {

  return (
    <li className="card-box">
      <p className="card-message">{message}</p>
      <div className="card-actions">
        <span className="like-count">❤️ {likeCount}</span>
        <button className="like-button" onClick={() => increaseLikeCount(id)}>➕</button>
        <button className="delete-button" onClick={() => deleteCard(id)} title="Delete">❌</button>
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
};

export default Card;