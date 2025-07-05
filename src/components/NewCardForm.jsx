import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NewCardForm = ({ onPostCard }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
    setError(validate(event.target.value));
  };

  const validate = (value) => {
    // if (!value.trim()) {
    //   return 'This field is required';
    // }
    if (value.length > 40) {
      return 'Maximum 40 characters allowed';
    }
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validate(message);
    setError(validationError);
    if (!validationError) {
      onPostCard({ message: message });
      setMessage('');
    }
  };

  return (
    <section>
      <h2>Create a new card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="card-message">Message</label>
          <input
            id="card-message"
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            onBlur={() => setError(validate(message))}
            maxLength={41}
            placeholder="message is required"
            className={error ? 'error' : ''}
          />
        </div>
        <div className="message-feedback">
          {error ? (
            <span className="error">{error}</span>
          ) : (
            <span className="char-count">{message.length}/40</span>
          )}
        </div>

        <button type="submit" disabled={!!error}>Submit</button>
      </form>
    </section>
  );
};


NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
};
export default NewCardForm;