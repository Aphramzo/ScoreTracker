import React, { Component } from 'react';
import Scores from './data/Scores';
import Chart from './components/Chart';
import logo from './logo.svg';
import './App.css';

class App extends Component { 
  render() {
    return (
      <Chart
        scores={Scores}
      />
    );
  }
}

export default App;
