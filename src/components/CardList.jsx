import PropTypes from 'prop-types';
import Card from './Card';

const CardList = ({ cards }) => {
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          message={card.message}
        />
      );
    })
  };

  return <ul className="cardlist-container">
    { getCardListJSX (cards)}
  </ul>
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default CardList;