import { useReducer, useEffect } from "react";

const formatNumber = n => Number(n.toFixed(2));

export default function useCurrencies(symbols = ["USD"]) {
  const defaultState = {
    rates: {},
    currencies: symbols.map(symbol => ({
      symbol,
      usdRate: -1,
      value: -1
    })),
    src: 0
  };

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_VALUE": {
        const { index, value } = action.payload;

        const usd = formatNumber(value / state.currencies[index].usdRate);
        const currencies = state.currencies.map((currency, i) => ({
          ...currency,
          value: i === index ? value : formatNumber(usd * currency.usdRate)
        }));

        return {
          ...state,
          currencies,
          src: index
        };
      }
      case "SET_CURRENCIES": {
        return {
          ...state,
          currencies: action.payload
        };
      }
      case "SET_RATES": {
        const rates = action.payload;
        const srcCurrency = state.currencies[state.src];
        const srcUsdValue = srcCurrency.value / srcCurrency.usdRate;

        const currencies = state.currencies.map((currency, index) => {
          const usdRate = rates[currency.symbol];
          const value =
            currency.value === -1
              ? formatNumber(usdRate * srcUsdValue)
              : currency.value;

          return {
            ...currency,
            usdRate,
            value
          };
        });

        return {
          ...state,
          rates,
          currencies
        };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    fetch("https://api.ratesapi.io/api/latest?base=USD")
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: "SET_RATES",
          payload: data.rates
        });
      });
  }, []);

  return {
    currencies: state.currencies,
    updateValue: (index, value) => {
      dispatch({
        type: "UPDATE_VALUE",
        payload: {
          index,
          value
        }
      });
    },
    removeCurrency: index => {
      dispatch({
        type: "SET_CURRENCIES",
        payload: [
          ...state.currencies.slice(0, index),
          ...state.currencies.slice(index + 1)
        ]
      });
    }
  };
}
