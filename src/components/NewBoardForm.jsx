import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultFormData = {
  title: '',
  owner: '',
};

const NewBoardForm = ( { onPostBoard }) => {
  const [formData, setFormData] = useState(kDefaultFormData);
  const handleChange = (event) => {
    setFormData(formData => {
    return {...formData, [event.target.name]: event.target.value };});
  };
  const handleSubmit = (event) => {
    // once user clicks "submit", we want to send this new form data back to app to call backend to handle it; 
    event.preventDefault();
    onPostBoard(formData);
    setFormData(kDefaultFormData);
  };
  return <section>
    <h2>Create a new board</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="board-title">Title</label>
        <input
          id="board-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="board-owner">Owner</label>
        <input
          id="board-owner"
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
        />
      </div>
      <button>Submit</button>
    </form>
  </section>;
};

NewBoardForm.propTypes = {
  onPostBoard: PropTypes.func.isRequired,
};
export default NewBoardForm;