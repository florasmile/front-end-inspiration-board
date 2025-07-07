import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const kDefaultFormData = {
  title: '',
  owner: '',
};

const NewBoardForm = ({ onPostBoard, isOpen, toggleNewBoardForm }) => {
  const [formData, setFormData] = useState(kDefaultFormData);
  const [errors, setErrors] = useState(kDefaultFormData);
  // const [touched, setTouched] = useState({ title: false, owner: false });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(kDefaultFormData);
      setErrors(kDefaultFormData);
      // setTouched({ title: false, owner: false });
      setHasSubmitted(false);
    }
  }, [isOpen]);

  const validateField = (name, value) => {
    if (!value.trim()) {
      return '⚠️';
    }
    if (value.length > 40) {
      return '⚠️ 40 max';
    }
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(formData => {
      return { ...formData, [name]: value };
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  //track which fields have been filled out (touched)

  const handleBlur = (event) => {
    const { name } = event.target;
    // setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const handleSubmit = (event) => {
    // once user clicks "submit", we want to send this new form data back to app to call backend to handle it; 
    event.preventDefault();
    setHasSubmitted(true);
    // Validate all fields on submit
    const newErrors = {
      title: validateField('title', formData.title),
      owner: validateField('owner', formData.owner)
    };
    setErrors(newErrors);
    //check error, prevent submission if there is error
    if (Object.values(newErrors).some(Boolean)) return;

    onPostBoard(formData);
    setFormData(kDefaultFormData);
    setErrors(kDefaultFormData);
    // setTouched({ title: false, owner: false });
    setHasSubmitted(false);
  };

  //do not let create new board without title or owner. All field requarement
  const isSubmitDisabled =
    hasSubmitted && (
      !formData.title.trim() ||
      !formData.owner.trim() ||
      errors.title ||
      errors.owner
    );

  const handleReset = () => {
    setFormData(kDefaultFormData);
  };

  return <section>
    <h2>Create new board</h2>
    <span> 
      <button onClick={toggleNewBoardForm}>Hide form</button>
    </span>
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="board-title">Title</label>
        <input
          id="board-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={41}
          placeholder="title is required"
          // className={((hasSubmitted || touched.title) && errors.title) ? 'error' : ''}
          className={errors.title ? 'error' : ''}
        />
        <div className="form-feedback">
          {errors.title
            ? <span className="error">{errors.title}</span>
            : <span className="char-count">{formData.title.length}/40</span>}
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
          onBlur={handleBlur}
          maxLength={41}
          placeholder="owner is required"
          // className={((hasSubmitted || touched.owner) && errors.owner) ? 'error' : ''}
          className={errors.owner ? 'error' : ''}
        />
        <div className="form-feedback">
          {errors.owner
            ? <span className="error">{errors.owner}</span>
            : <span className="char-count">{formData.owner.length}/40</span>}
        </div>
      </div>
      <div className="icon-buttons">
        <button type="submit" disabled={isSubmitDisabled}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </form>
  </section>;
};

NewBoardForm.propTypes = {
  onPostBoard: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleNewBoardForm: PropTypes.bool.isRequired,
};
export default NewBoardForm;
