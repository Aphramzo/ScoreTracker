import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HighCharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { v4 } from 'uuid';

Exporting(HighCharts);

const chartId = v4();
class Chart extends Component {
    constructor(props) {
        super(props);
        this.calculateSeries = this.calculateSeries.bind(this);
    }
    componentDidMount() {
        this.calculateSeries();
    }

    componentDidUpdate(){
        this.calculateSeries();
    }
    
    calculateSeries() {
        const average = [];
        const averageScore = [];
        this.props.scores.map(score => {
            average.push(score);
            const newAverage = average.reduce((a,b) => a + b, 0) / average.length;
            return averageScore.push(newAverage);
        });
        HighCharts.chart(chartId, {
            title: {
                text: 'Scores',
            },
            series: [{
                name: 'Original',
                data: this.props.scores
            }, {
                name: 'Original Average',
                data: averageScore,
            }],
        });
    }

    render() {
        return (
            <div id={chartId} />
        );
    } 
};

Chart.propTypes = {
    scores: PropTypes.array.isRequired,
}

export default Chart;
