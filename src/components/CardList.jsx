import PropTypes from 'prop-types';
import Card from './Card';
import './CardList.css';

const CardList = ({ cards, increaseLikeCount, deleteCard }) => {
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          message={card.message}
          likeCount={card.likeCount}
          increaseLikeCount={increaseLikeCount}
          deleteCard={deleteCard}
        />
      );
    })
  };

  return (
    <div className="card-list">
      {getCardListJSX(cards)}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likeCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  increaseLikeCount: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default CardList;