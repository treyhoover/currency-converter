import { useReducer } from "react";

export default function useCurrencies() {
  const defaultState = {
    currencies: [
      {
        symbol: "USD",
        value: 1,
        usdRate: 1
      },
      {
        symbol: "EUR",
        value: 0.91,
        usdRate: 0.91
      },
      {
        symbol: "GBP",
        value: 1.24,
        usdRate: 1.24
      }
    ],
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
    }
  };
}
