import { useReducer } from "react";

const usdRates = {
  USD: 1,
  EUR: 0.91,
  GBP: 1.24
};

export default function useCurrencies(symbols = ["USD"]) {
  const defaultState = {
    currencies: symbols.map(symbol => ({
      symbol,
      usdRate: usdRates[symbol],
      value: usdRates[symbol]
    })),
    src: 0
  };

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_VALUE": {
        const { index, value } = action.payload;

        const usd = Number(
          (value / state.currencies[index].usdRate).toFixed(2)
        );

        const currencies = state.currencies.map((currency, i) => ({
          ...currency,
          value:
            i === index ? value : Number((usd * currency.usdRate).toFixed(2))
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
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

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
