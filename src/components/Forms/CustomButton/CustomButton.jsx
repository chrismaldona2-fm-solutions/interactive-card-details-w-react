import React from "react";
import styles from "./CustomButton.module.css";

export default function CustomButton({
  type = "button",
  text = "Submit",
  onClick,
  ...props
}) {
  return (
    <button className={styles.button} type={type} onClick={onClick} {...props}>
      {text}
    </button>
  );
}
