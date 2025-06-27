import { useState } from 'react';
import PropTypes from 'prop-types';

const NewCardForm = ({ onPostCard }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
    setError('');
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(message.length > 40) {
      setError('Message cannot exceed 40 characters');
      return;
    };
    if(message.length == 0) {
      setError('Message cannot be empty');
      return;
    }
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
        {error && <div>{error}</div>}
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