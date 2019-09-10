import { useReducer, useEffect } from "react";

export default function useCurrencies(symbols = ["USD"]) {
  const defaultState = {
    rates: {},
    currencies: symbols.map((symbol, i) => ({
      id: i,
      symbol,
      value: 1
    })),
    src: 0
  };

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_SYMBOL": {
        const { index, symbol } = action.payload;

        const currencies = Object.assign([...state.currencies], {
          [index]: {
            ...state.currencies[index],
            symbol
          }
        });

        return {
          ...state,
          currencies
        };
      }
      case "UPDATE_VALUE": {
        const { index, value } = action.payload;

        const currencies = Object.assign([...state.currencies], {
          [index]: {
            ...state.currencies[index],
            value
          }
        });

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
      case "ADD_CURRENCY": {
        const { symbol = "USD", value = 1 } = action.payload;

        return {
          ...state,
          currencies: [
            ...state.currencies,
            {
              id: state.currencies.length,
              symbol,
              value
            }
          ]
        };
      }
      case "SET_RATES": {
        const rates = action.payload;

        return {
          ...state,
          rates
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
    ...state,
    updateSymbol: (index, symbol) => {
      dispatch({
        type: "UPDATE_SYMBOL",
        payload: {
          index,
          symbol
        }
      });
    },
    updateValue: (index, value) => {
      dispatch({
        type: "UPDATE_VALUE",
        payload: {
          index,
          value
        }
      });
    },
    addCurrency: (symbol, value) => {
      dispatch({
        type: "ADD_CURRENCY",
        payload: {
          symbol,
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
    },
    getValue: index => {
      const { currencies, src, rates } = state;
      const srcCurrency = currencies[src];
      const srcValue = srcCurrency.value;
      const srcCurrencyRate = rates[srcCurrency.symbol];
      const targetCurrency = currencies[index];
      const targetCurrencyRate = rates[targetCurrency.symbol];

      // Use the user value when requesting for src
      if (index === src) return srcValue;

      const srcValueUsd = srcValue / srcCurrencyRate;

      return srcValueUsd * targetCurrencyRate;
    }
  };
}
