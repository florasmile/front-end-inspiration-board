import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const kDefaultFormData = {
  title: '',
  owner: '',
};

const NewBoardForm = ({ onPostBoard, isOpen, submitBoard, setSubmitBoard, resetBoard, setResetBoard }) => {
  const [formData, setFormData] = useState(kDefaultFormData);
  const [errors, setErrors] = useState(kDefaultFormData);

  useEffect(() => {
    if (!isOpen) {
      setFormData(kDefaultFormData);
      setErrors(kDefaultFormData);

    }
  }, [isOpen]);

  useEffect(() => {
    if (submitBoard) {
      handleSubmit();
      setSubmitBoard(false);
    }
  }, [submitBoard]);

  useEffect(() => {
    if (resetBoard) {
      handleReset();
      setResetBoard(false);
    }
  }, [resetBoard]);

  const validateField = (name, value) => {
    if (!value.trim()) return '⚠️';
    if (value.length > 40) return 'Max 40 chars';
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const handleSubmit = () => {
    const newErrors = {
      title: validateField('title', formData.title),
      owner: validateField('owner', formData.owner),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    onPostBoard(formData);
    setFormData(kDefaultFormData);
    setErrors(kDefaultFormData);
  };

  const handleReset = () => {
    setFormData(kDefaultFormData);
    setErrors(kDefaultFormData);
  };

    

  return (
    <section>
      <h2>New Board</h2>
      <form>
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
            className={errors.owner ? 'error' : ''}
          />
          <div className="form-feedback">
            {errors.owner
              ? <span className="error">{errors.owner}</span>
              : <span className="char-count">{formData.owner.length}/40</span>}
          </div>
        </div>
      </form>
    </section>
  );
};

NewBoardForm.propTypes = {
  onPostBoard: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  submitBoard: PropTypes.bool.isRequired,
  setSubmitBoard: PropTypes.func.isRequired,
  resetBoard: PropTypes.bool.isRequired,
  setResetBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
