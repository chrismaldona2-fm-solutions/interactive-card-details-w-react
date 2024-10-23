import React from "react";
import styles from "./CustomInput.module.css";

export function BasicCustomInput({
  id,
  name,
  label,
  value,
  type,
  customType,
  placeholder,
  onChange,
  onBlur,
  error,
  ...props
}) {
  let customOnChange = () => {};
  if (customType) {
    switch (customType) {
      case "creditCard":
        customOnChange = (e) => {
          let { value } = e.target;
          value = value.replace(/\D/g, "");
          const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
          const limitedValue = formattedValue.slice(0, 19);
          e.target.value = limitedValue;
          onChange(e);
        };
        break;
      case "cvc":
        customOnChange = (e) => {
          let { value } = e.target;
          value = value.replace(/\D/g, "").slice(0, 3);
          e.target.value = value;
          onChange(e);
        };
        break;
    }
  }

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles["input--invalid"] : ""}`}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={customType ? customOnChange : onChange}
        onBlur={onBlur}
        {...props}
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
}

export function ExpirationCustomInput({
  onChange,
  onBlur,
  errors,
  monthValue,
  yearValue,
}) {
  const handleChange = (e) => {
    let { name, value } = e.target;
    value = value.replace(/[^0-9]/g, "").slice(0, name === "expMonth" ? 2 : 2);
    if (name === "expMonth" && parseInt(value) > 12) {
      value = "12";
    }
    e.target.value = value;
    onChange(e);
  };

  const [monthError, yearError] = errors;

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor="expMonth">
        Exp. Date (MM/YY)
      </label>
      <div className={styles["input--double"]}>
        <input
          className={`${styles.input} ${
            monthError ? styles["input--invalid"] : ""
          }`}
          id="expMonth"
          name="expMonth"
          type="text"
          placeholder="MM"
          value={monthValue}
          onBlur={onBlur}
          onChange={handleChange}
        />
        <input
          className={`${styles.input} ${
            yearError ? styles["input--invalid"] : ""
          }`}
          id="expYear"
          name="expYear"
          type="text"
          placeholder="YY"
          value={yearValue}
          onBlur={onBlur}
          onChange={handleChange}
        />
      </div>
      <span className={styles.error}>{monthError || yearError}</span>
    </div>
  );
}
