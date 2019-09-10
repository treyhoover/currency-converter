import React from "react";
import useCurrencies from "../../hooks/useCurrencies";
import styles from "./converter.module.css";

const Converter = props => {
  const { currencies, updateValue, removeCurrency } = useCurrencies([
    "USD",
    "EUR",
    "GBP"
  ]);

  return (
    <form>
      {currencies.map(({ symbol, usdRate, value }, index) => {
        const loading = usdRate === -1;

        return (
          <div className={styles.currency} key={symbol}>
            <label className={styles.currencyLabel}>{symbol}</label>
            <input
              name={index}
              type={loading ? "text" : "number"}
              value={loading ? "Loading..." : value}
              disabled={loading}
              onChange={e => updateValue(Number(e.target.name), e.target.value)}
              onFocus={e => e.target.select()}
            />
            <button
              type="button"
              disabled={loading}
              onClick={e => {
                removeCurrency(index);
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </form>
  );
};

export default Converter;
