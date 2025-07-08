import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NewCardForm = ({ onPostCard, isOpen, forwardedSubmit, forwardedReset }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value.trim()) {
      return '⚠️';
    }
    if (value.length > 40) {
      return '⚠️ 40 max';
    }
    return '';
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    setError(validate(value));
  };

  useEffect(() => {
    if (!isOpen) {
      setMessage('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (forwardedSubmit) forwardedSubmit.current = handleSubmit;
    if (forwardedReset) forwardedReset.current = handleReset;
  }, [message, error]);

  const handleSubmit = () => {
    const validationError = validate(message);
    setError(validationError);
    if (!validationError) {
      onPostCard({ message: message });
      setMessage('');
    }
  };

  const handleReset = () => {
    setMessage('');
    setError('');
  };

  return (
    <section>
      <h2>New Card</h2>
      <form>
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
      </form>
    </section>
  );
};

NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  forwardedSubmit: PropTypes.object,
  forwardedReset: PropTypes.object,
};

export default NewCardForm;
