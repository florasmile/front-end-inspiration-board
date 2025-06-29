// import angerImg from '../assets/anger.jpg';
// import disgustImg from '../assets/disgust.jpg';
// import fearImg from '../assets/fear.jpg';
// import happinessImg from '../assets/happiness.jpg';
// import sadnessImg from '../assets/sadness.jpg';
// import surpriseImg from '../assets/surprise.jpg';
// import tnxImg from '../assets/tnx.jpg';

const MOODS = ["anger", "disgust", "fear", "happiness", "sadness", "surprise", "tnx"];
// const MOODS = {
//   anger: angerImg,
//   disgust: disgustImg,
//   fear: fearImg,
//   happiness: happinessImg,
//   sadness: sadnessImg,
//   surprise: surpriseImg,
//   tnx: tnxImg,
// }

const MoodSelector = ({ onMoodChange }) => {
  // const handleClick = (event) => {
  //   //pass mood name to call back
  //   changeMood(event.target.value);
  // };
  const createMoodButtons = () => {
    return MOODS.map((mood) => {
      return (
        <button key={mood}
          onClick={()=> onMoodChange(mood)}
        >{mood}</button>
      )
    })
  };
  //
  return (
    <div className="mood-selector">
      <h3>pick a mood</h3>
      <div>
        {createMoodButtons()}
      </div>
    </div>
  );
};

export default MoodSelector;