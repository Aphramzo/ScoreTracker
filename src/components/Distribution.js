import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HighCharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(HighCharts);

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameNumber: 0,
        };
        
        this.addScore = this.addScore.bind(this);
        this.buildChart = this.buildChart.bind(this);
    }
    componentDidMount() {
        this.buildChart();
        this.interval = window.setInterval(this.addScore, this.props.interval);
    }

    buildChart() {
        let categories = [];
        let data = [];
        
        for(let i = 0; i < this.props.max; i++) {
            categories = [
                ...categories,
                i,
            ];

            data = [
                ...data,
                0,
            ];
        }
        this.chart = HighCharts.chart(this.props.id, {
            title: {
                text: this.props.title,
            },
            xAxis: {
                categories,
                title: {
                    text: 'Score',
                },
            },
            yAxis: {
                title: {
                    text: '# of Games',
                },
            },
            chart: {
                animation: false,
                type: 'column',
            },
            series: [{
                name: '# of Games',
                data,   
            }],
        });
    }

    addScore() {
        const propScores = this.props.scores;
        
        // If we have already filled out scores, stop the interval
        if (this.state.gameNumber === propScores.length) {
          clearInterval(this.interval);
          return;
        }

        const gameScore = this.chart.series[0].data[propScores[this.state.gameNumber]].x;

        this.chart.series[0].data[gameScore].update(this.chart.series[0].data[gameScore].y + 1)
        
        this.setState({
            gameNumber: this.state.gameNumber + 1,
        });
    }

    render() {
        return (
            <div id={this.props.id} />
        );
    } 
};

Chart.propTypes = {
    id: PropTypes.string.isRequired,
    interval: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    scores: PropTypes.array.isRequired,
    seriesName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

Chart.defaultProps = {
    interval: 500,
    max: 100,
    min: 0,
};

export default Chart;
