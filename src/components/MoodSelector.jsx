import { useState } from 'react';

const MoodSelector = ({ onChangeMood }) => {
  const moodOptions = [
    'anger', 'black&white', 'default', 'disgust', 'faces', 'fear',
    'happiness', 'neutral', 'pride', 'sadness', 'surprise', 'tnx'
  ];
  const [currentMood, setCurrentMood] = useState('default');

  const handleMoodChange = (event) => {
    const selectedMood = event.target.value;
    onChangeMood(selectedMood);
    setCurrentMood(selectedMood);
  };
  return (
    <section>
      <h2>Choose your Mood</h2>
      <div className="form-row">
        <label htmlFor="mood-select">Mood</label>
        <select id="mood-select" onChange={handleMoodChange} value={currentMood}>
          <option value="" disabled>choose a mood</option>
          {moodOptions.map(mood => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>
    </section>
  );
}
export default MoodSelector;