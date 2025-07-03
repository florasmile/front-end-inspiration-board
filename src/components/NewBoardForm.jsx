import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const kDefaultFormData = {
  title: '',
  owner: '',
};

const NewBoardForm = ( { onPostBoard }) => {
  const [formData, setFormData] = useState(kDefaultFormData);
  const [errors, setErrors] = useState(kDefaultFormData);

  const validateField = (name, value) => {
    // if (!value.trim()) {
    //   return 'This field is required';
    // }
    if (value.length > 40) {
      return 'Maximum 40 characters allowed';
    }
    if (/[^a-zA-Z0-9 ]/.test(value)) {
      return 'No special characters allowed';
    }
    return '';
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(formData => {
    return {...formData, [name]: value };});
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };
  const handleSubmit = (event) => {
    // once user clicks "submit", we want to send this new form data back to app to call backend to handle it; 
    event.preventDefault();
      // Validate all fields on submit
    const newErrors = {
      title: validateField('title', formData.title),
      owner: validateField('owner', formData.owner)
    };
    setErrors(newErrors);
    //check error, prevent submission if there is error
    if (!errors.title && !errors.owner){
      onPostBoard(formData);
      setFormData(kDefaultFormData);
    }
  };
  return <section>
    <h2>Create a new board</h2>
    <form onSubmit={handleSubmit} className="board-form"> 
      <div className="form-row">
        <label htmlFor="board-title">Title</label>
        <input
          id="board-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={() => setErrors({ ...errors, title: validateField('title', formData.title)})}
          maxLength={41}
          placeholder="title is required"
          className={errors.title? 'error': ''}
        />
        <div className="form-feedback">
          {errors.title ? (
            <span className="error">{errors.title}</span>
          ) : (
            <span className="char-count">{formData.title.length}/40</span>
          )}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="board-owner">Owner</label>
        <input
          id="board-owner"
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          onBlur={() => setErrors({
            ...errors,
            owner: validateField('owner', formData.owner)
          })}
          maxLength={41}
          placeholder="owner is required"
          className={errors.owner ? 'error' : ''}
        />
        <div className="form-feedback">
          {errors.owner ? (
            <span className="error">{errors.owner}</span>
          ) : (
            <span className="char-count">{formData.owner.length}/40</span>
          )}
        </div>
      </div>
      <button type="submit" disabled={!!errors.title || !!errors.owner}>Submit</button>
    </form>
  </section>;
};

NewBoardForm.propTypes = {
  onPostBoard: PropTypes.func.isRequired,
};
export default NewBoardForm;