import React, { Component } from 'react';
import Scores from './data/Scores';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };

    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    this.interval = window.setInterval(this.addScore, 1000);
  }

  addScore() {
    const {
      scores,
    } = this.state;
    // If we have already filled out scores, stop the interval
    if (scores.length === Scores.length) {
      clearInterval(this.interval);
      return;
    }

    this.setState({
      scores: [
        ...scores,
        Scores[scores.length],
      ],
    });
  }

  render() {
    const {
      scores,
    } = this.state;
    console.log('rendering w/ ', scores);
    return (
      <Chart
        scores={scores}
      />
    );
  }
}

export default App;
