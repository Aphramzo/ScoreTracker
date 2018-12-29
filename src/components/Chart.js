import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HighCharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(HighCharts);

class Chart extends Component {
    constructor(props) {
        super(props);
        
        this.addScore = this.addScore.bind(this);
        this.buildChart = this.buildChart.bind(this);
    }
    componentDidMount() {
        this.buildChart();
        this.interval = window.setInterval(this.addScore, this.props.interval);
    }

    buildChart() {
        this.chart = HighCharts.chart(this.props.id, {
            title: {
                text: this.props.title,
            },
            chart: {
                animation: false,
                type: this.props.type,
            },
            xAxis: {
                title: {
                    text: 'Game Number',
                },
            },
            yAxis: {
                title: {
                    text: 'Score',
                },
            },
            series: [{
                name: this.props.seriesName,
                data: []
            }, {
                name: `${this.props.seriesName} average`,
                data: [],
            }],
        });
    }

    addScore() {
        const propScores = this.props.scores;
        const scores = this.chart.series[0].data;

        // If we have already filled out scores, stop the interval
        if (scores.length === propScores.length) {
          clearInterval(this.interval);
          return;
        }

        const scoresToAverage = propScores.slice(0, scores.length+1);
        const average = scoresToAverage.reduce((a,b) => a + b, 0) / scoresToAverage.length;


        this.chart.series[0].addPoint(propScores[scores.length], true);
        this.chart.series[1].addPoint(average, true);
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
    scores: PropTypes.array.isRequired,
    seriesName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
};

Chart.defaultProps = {
    interval: 500,
    type: 'line',
};

export default Chart;
