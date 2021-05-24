import React, { useState, useEffect } from 'react';
import './App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { getExchangeRate, getChart } from './CurrencyExchangeProvider';
import { CURRENCIES } from './CurrenciesProvider';
import { DayItem } from './CurrencyExchangeInterface';

import Statistics from './Statistics';
import Error from './Error';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [chartData, setChartData] = useState([] as Array<DayItem>);
  const [error, setError] = useState('');

  // Material-UI Select type is 'unknown', so using 'any' here and further to support useState 'string'
  const onFromCurrencyChange = (event: React.ChangeEvent<{ value: any }>) => {
    setFromCurrency(event.target.value);
  };
  const onToCurrencyChange = (event: React.ChangeEvent<{ value: any }>) => {
    setToCurrency(event.target.value);
  };
  const onFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFromValue = Math.round(Number(event.target.value) * 100) / 100;
    const newToValue = Math.round(newFromValue * exchangeRate * 100) / 100;
    setFromValue(newFromValue);
    setToValue(newToValue);
  };

  useEffect((): void => {
    // Using Promises to keep both calls async
    getExchangeRate(fromCurrency, toCurrency).then((newExchangeRate: number | void) => {
      if (newExchangeRate) {
        setExchangeRate(newExchangeRate);
        setToValue(Math.round(fromValue * newExchangeRate * 100) / 100);
      } else {
        setError('Error getting Exchange Rate. The API limit is 5 calls per minute, please try again in a minute');
      }
    });

    getChart(fromCurrency, toCurrency).then((newChartData: Array<DayItem> | void) => {
      if (newChartData) {
        setChartData(newChartData);
      } else {
        setError('Error getting Chart Data. The API limit is 5 calls per minute, please try again in a minute');
      }
    });

  }, [fromCurrency, toCurrency, fromValue]);

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className="app-container">
      <Grid item>
        <Card elevation={0} className="app">
          <CardContent>
            <header>
              <h1>
                <span className="title">Ultimate Currency Exchange Rates from Secfi</span>
                <span className="humour">Other cheat with the rates. <br/> We don't.</span>
              </h1>
            </header>

            <form action="" className="currency-exchange">
              <FormControl>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fromCurrency}
                  onChange={onFromCurrencyChange}>
                  {CURRENCIES.map((currency, index) =>
                    <MenuItem key={index} value={currency.currencyCode}>{currency.currencyCode}</MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toCurrency}
                  onChange={onToCurrencyChange}>
                  {CURRENCIES.map((currency, index) =>
                    <MenuItem key={index} value={currency.currencyCode}>{currency.currencyCode}</MenuItem>
                  )}
                </Select>
              </FormControl>

              <TextField className={'currency-amount'}
                         id="from-value"
                         type="number"
                         value={fromValue}
                         onChange={onFromValueChange}
              />
              <TextField className={'currency-amount'}
                         id="to-value"
                         type="number"
                         value={toValue}
                         disabled
              />
            </form>

            <Statistics
              exchangeRate={exchangeRate}
              chartData={chartData}
            />

            <Error
              error={error}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
