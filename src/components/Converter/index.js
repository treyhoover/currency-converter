import React from "react";
import useCurrencies from "../../hooks/useCurrencies";
import styles from "./converter.module.css";

const Converter = props => {
  const { currencies, updateValue } = useCurrencies(["USD", "EUR", "GBP"]);

  return (
    <form>
      {currencies.map((currency, index) => (
        <div className={styles.currency} key={currency.symbol}>
          <label className={styles.currencyLabel}>{currency.symbol}</label>
          <input
            name={index}
            type="number"
            value={currency.value}
            onChange={e => updateValue(Number(e.target.name), e.target.value)}
            onFocus={e => e.target.select()}
          />
        </div>
      ))}
    </form>
  );
};

export default Converter;
