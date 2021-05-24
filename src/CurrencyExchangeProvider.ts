import { ChartPayload, DayItem, ExchangeRatePayload } from './CurrencyExchangeInterface';

const API_KEY = '99KEI0VSM8OBXFA8';

/**
 * Returns the Promise with the fromCurrency-toCurrency exchange rate from cache or API
 * @param fromCurrency - from which currency conversion is required
 * @param toCurrency - to which currency conversion is required
 */
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number | void> {
  const cachedExchangeRate = sessionStorage.getItem(`rate-${fromCurrency}-${toCurrency}`);

  if (cachedExchangeRate) {
    return new Promise(resolve => resolve(Number(cachedExchangeRate)));
  } else {
    return fetchExchangeRate(fromCurrency, toCurrency);
  }
}

/**
 * Returns the Promise of fetched Currency Exchange data from API
 * @param fromCurrency - from which currency conversion is required
 * @param toCurrency - to which currency conversion is required
 */
function fetchExchangeRate(fromCurrency: string, toCurrency: string): Promise<number | void> {
  return fetch(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`,
    {
      method: "GET"
    }
  )
    .then(response => response.json())
    .then((response: ExchangeRatePayload) => {
      const responsePayload = response['Realtime Currency Exchange Rate'];
      const newExchangeRate = responsePayload['5. Exchange Rate'];
      sessionStorage.setItem(`rate-${fromCurrency}-${toCurrency}`, newExchangeRate);
      return Number(newExchangeRate);
    })
    .catch(error => console.log(error));
}

/**
 * Returns the Promise with the Chart data of the previous day close and all data for previous 30 days from cache or API
 * @param fromCurrency - from which currency conversion is required
 * @param toCurrency - to which currency conversion is required
 */
export async function getChart(fromCurrency: string, toCurrency: string): Promise<Array<DayItem> | void> {
  const cachedChart = sessionStorage.getItem(`chart-${fromCurrency}-${toCurrency}`);

  if (cachedChart) {
    return new Promise(resolve => resolve(JSON.parse(cachedChart)));
  } else {
    return fetchChart(fromCurrency, toCurrency);
  }
}

/**
 * Returns the Promise of fetched Chart data from API
 * @param fromCurrency - from which currency conversion is required
 * @param toCurrency - to which currency conversion is required
 */
function fetchChart(fromCurrency: string, toCurrency: string): Promise<Array<DayItem> | void> {
  return fetch(
    `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${API_KEY}`,
    {
      method: "GET"
    }
  )
    .then(response => response.json())
    .then((response: ChartPayload) => {
      const responsePayload = response['Time Series FX (Daily)'];

      const preparedPayloadData = Object.keys(responsePayload).map((day: string) => {
        const modifiedDay: any = {};
        modifiedDay[day] = responsePayload[day];
        return modifiedDay;
      });

      const newChartData = preparedPayloadData.reverse().map((dayData: any) => {
        const day = Object.keys(dayData)[0];
        return {
          day: day.substring(5),
          open: Number(dayData[day]['1. open']),
          high: Number(dayData[day]['2. high']),
          low: Number(dayData[day]['3. low']),
          close: Number(dayData[day]['4. close']),
        };
      }).slice(70); // taking last 30 days as per requirements

      sessionStorage.setItem(`chart-${fromCurrency}-${toCurrency}`, JSON.stringify(newChartData));

      return newChartData;
    })
    .catch(error => console.log(error));
}
