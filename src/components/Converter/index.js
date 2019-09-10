import React from "react";
import useCurrencies from "../../hooks/useCurrencies";
import styles from "./converter.module.css";

const Converter = props => {
  const {
    currencies,
    rates,
    getValue,
    updateValue,
    updateSymbol,
    removeCurrency
  } = useCurrencies(["USD", "EUR", "GBP"]);

  return (
    <form>
      {currencies.map(({ id, symbol }, index) => {
        const usdRate = rates[symbol];
        const loading = !usdRate;

        return (
          <div className={styles.currency} key={id}>
            <select
              className={styles.currencySelector}
              disabled={loading}
              value={symbol}
              onChange={e => updateSymbol(index, e.target.value)}
            >
              {Object.keys(rates).map(rate => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
            <input
              name={index}
              type={loading ? "text" : "number"}
              value={loading ? "Loading..." : getValue(index)}
              disabled={loading}
              onChange={e => updateValue(Number(e.target.name), e.target.value)}
              onFocus={e => e.target.select()}
            />
            <button
              type="button"
              className={styles.deleteCurrencyButton}
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
