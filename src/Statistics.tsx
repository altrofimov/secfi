import React from 'react';
import './App.css';

import { Chart, LineSeries } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';

import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

import { DayItem } from './CurrencyExchangeInterface';

// Dumb/Presentation component
function Statistics(props: {exchangeRate: number, chartData: Array<DayItem>}) {
  return (
    <div className="statistics">
      <div className={'statistics-data'}>
        <InputLabel id="demo-simple-select-label">Current Rate</InputLabel>
        <span>{props.exchangeRate}</span>
      </div>

      <Paper className={'chart'}>
        <Chart height={100} data={props.chartData}>
          <ValueScale name="close"/>
          <LineSeries
            name="Close value"
            valueField="close"
            argumentField="day"
            scaleName="close"/>
        </Chart>
      </Paper>
    </div>
  );
}

export default Statistics;
