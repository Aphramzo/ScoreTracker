import React from 'react';
import Scores from './data/Scores';
import Chart from './components/Chart';
import './App.css';

const App = props => {
  return (
    <Chart
      interval={500}
      scores={Scores}
      seriesName="Original"
      title="Scores"
    />
  );
}

export default App;
