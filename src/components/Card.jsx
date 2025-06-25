import PropTypes from 'prop-types';
const Card = ({ id, message, likeCount, increaseLikeCount, deleteCard}) => {

  return <li className="card-container">
    <p>{message}</p>
    <div>
      <span>{likeCount} 💕</span>
      <button onClick={()=> increaseLikeCount(id)}>+1</button>
      <button onClick={() => deleteCard(id)}>delete</button>
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