import { useState } from 'react';
import PropTypes from 'prop-types';

const NewCardForm = ({ onPostCard }) => {
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onPostCard({message});
    setMessage('');
  };

  return (
    <section>
      <h2>Create a new card</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="card-message">Message</label>
        <input
          id="card-message"
          type="text"
          name="message"
          value={message}
          onChange={handleChange}
        />
      </div>
      <button>Submit</button>
      </form>
    </section>
  );
};


NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
};
export default NewCardForm;