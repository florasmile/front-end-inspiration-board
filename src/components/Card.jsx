import PropTypes from 'prop-types';
const Card = ({ id, message }) => {

  return <li className="card-container">
    <p>{message}</p>
    <div>
      <span>💕</span>
      <button>+1</button>
      <button>delete</button>
    </div>    
  </li>;
};


Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
export default Card;