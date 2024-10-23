import React, { useState } from "react";
import styles from "./CreditCardForm.module.css";
import {
  BasicCustomInput,
  ExpirationCustomInput,
} from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { useCreditCardUpdate } from "../../../contexts/CreditCardDataContext";

export default function CreditCardForm() {
  const updateCreditCardData = useCreditCardUpdate();

  const [errors, setErrors] = useState({ cardholderName: "" });
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    if (Object.values(formData).some((data) => data === "")) {
      hasErrors = true;
    }
    const fieldsToValidate = [
      "cardholderName",
      "cardNumber",
      "expMonth",
      "expYear",
      "cvc",
    ];
    fieldsToValidate.forEach((field) => {
      validateInput(field, formData[field]);
      if (errors[field]) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      setIsConfirmed(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateCreditCardData({ [name]: value });
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "cardholderName":
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!value) {
          error = "Can't be blank";
        } else if (!namePattern.test(value)) {
          error = "Cardholder name can only contain letters and spaces";
        }
        break;
      case "cardNumber":
        const cardNumberPattern = /^(\d{4}[\s]?){3}\d{4}$/;
        if (!value) {
          error = "Can't be blank";
        } else if (!cardNumberPattern.test(value)) {
          error = "Invalid card number";
        }
        break;
      case "expMonth":
      case "expYear":
        if (!value) {
          error = "Can't be blank";
        }
        break;
      case "cvc":
        if (!value) {
          error = "Can't be blank";
        } else if (!/^[0-9]{3}$/.test(value)) {
          error = "CVC must be 3 digits";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    if (error === "") {
      const { [name]: _, ...solvedErrors } = errors;
      setErrors(solvedErrors);
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  const handleContinue = () => {
    setIsConfirmed(false);
  };

  return (
    <>
      {!isConfirmed && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <BasicCustomInput
            label="Cardholder Name"
            id="cardholderName"
            name="cardholderName"
            type="text"
            placeholder="e.g. Jane Appleseed"
            value={formData.cardholderName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.cardholderName}
          />
          <BasicCustomInput
            label="Card Number"
            id="cardNumber"
            name="cardNumber"
            type="text"
            customType="creditCard"
            value={formData.cardNumber}
            placeholder="e.g. 1234 5678 9123 0000"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.cardNumber}
          />
          <div className={styles["double-group"]}>
            <ExpirationCustomInput
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              errors={[errors.expMonth, errors.expYear]}
              monthValue={formData.expMonth}
              yearValue={formData.expYear}
            />

            <BasicCustomInput
              label="CVC"
              id="cvc"
              name="cvc"
              type="text"
              customType="cvc"
              placeholder="e.g. 123"
              value={formData.cvc}
              maxLength={3}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.cvc}
            />
          </div>
          <CustomButton type="submit" text="Confirm" />
        </form>
      )}

      {isConfirmed && (
        <div className={styles["confirmed-message"]}>
          <svg
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["confirmed-message__icon"]}
          >
            <circle cx="40" cy="40" r="40" fill="url(#a)" />
            <path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3" />
            <defs>
              <linearGradient
                id="a"
                x1="-23.014"
                y1="11.507"
                x2="0"
                y2="91.507"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#6348FE" />
                <stop offset="1" stop-color="#610595" />
              </linearGradient>
            </defs>
          </svg>

          <div className={styles["confirmed-message__text"]}>
            <h2>Thank you!</h2>
            <p>We've added your card details</p>
          </div>

          <CustomButton
            type="button"
            text="Continue"
            onClick={handleContinue}
          />
        </div>
      )}
    </>
  );
}
