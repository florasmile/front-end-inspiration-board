const MoodSelector = ({ onChangeMood }) => {
    const moodOptions = [
      'anger', 'black&white', 'default', 'disgust', 'faces', 'fear',
      'happiness', 'neutral', 'pride', 'sadness', 'surprise', 'tnx'
    ];
    const handleMoodChange = (event) => {
        onChangeMood(event.target.value);
    };
  return (
    <section>
      <h2>+ Mood</h2>
      <label>Current Mood
          <select onChange={handleMoodChange} defaultValue="">
              <option value="" disabled>choose a mood</option>
              {moodOptions.map(mood => <option key={mood} value={mood}>{mood}</option>)}
          </select>
      </label>
    </section>
  );
}
  
export default MoodSelector;