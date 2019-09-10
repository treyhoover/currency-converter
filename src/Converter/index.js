import React, { useState } from "react";
import styles from "./converter.module.css";

const symbols = {
  USD: "USD",
  EUR: "EUR"
};

const Converter = props => {
  const USD_EUR_RATE = 0.91;
  const [usd, setUsd] = useState(1);
  const [eur, setEur] = useState(USD_EUR_RATE);

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === symbols.USD) {
      setUsd(value);
      setEur(value * USD_EUR_RATE);
    } else if (name === symbols.EUR) {
      setEur(value);
      setUsd(value / USD_EUR_RATE);
    }
  };

  return (
    <form className={styles.converter}>
      <label className={styles.currencyLabel}>USD</label>
      <input
        name={symbols.USD}
        type="number"
        value={usd}
        onChange={handleInputChange}
      />

      <span className={styles.separator}>=</span>

      <label className={styles.currencyLabel}>EUR</label>
      <input
        name={symbols.EUR}
        type="number"
        value={eur}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default Converter;
