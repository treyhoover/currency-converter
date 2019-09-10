import React, { useReducer } from "react";
import styles from "./converter.module.css";

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

      const usd = Number((value / state.currencies[index].usdRate).toFixed(2));

      const currencies = state.currencies.map((currency, i) => ({
        ...currency,
        value: i === index ? value : Number((usd * currency.usdRate).toFixed(2))
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

const Converter = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleInputChange = e => {
    dispatch({
      type: "UPDATE_VALUE",
      payload: {
        index: Number(e.target.name),
        value: e.target.value
      }
    });
  };

  return (
    <form>
      {state.currencies.map((currency, index) => (
        <div className={styles.currency} key={currency.symbol}>
          <label className={styles.currencyLabel}>{currency.symbol}</label>
          <input
            name={index}
            type="number"
            value={currency.value}
            onChange={handleInputChange}
            onFocus={e => e.target.select()}
          />
        </div>
      ))}
    </form>
  );
};

export default Converter;
