import React from 'react';
import { v4 } from 'uuid';
import Scores from './data/Scores';
import Chart from './components/Chart';
import Distribution from './components/Distribution';
import './App.css';

const App = props => {
  return (
    <div>
      <Chart
        id={v4()}
        interval={500}
        scores={Scores}
        seriesName="Original"
        title="Scores"
      />
      <Distribution
        id={v4()}
        interval={500}
        max={100}
        min={0}
        scores={Scores}
        seriesName="Original"
        title="Score Distribution"
        type="bar"
      />
    </div>
  );
}

export default App;
