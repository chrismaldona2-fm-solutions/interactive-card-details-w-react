import React from "react";
import desktopBackground from "../../assets/images/bg-main-desktop.png";
import mobileBackground from "../../assets/images/bg-main-mobile.png";
import cardFront from "../../assets/images/bg-card-front.png";
import cardBack from "../../assets/images/bg-card-back.png";
import styles from "./CreditCardPreview.module.css";
import { useCreditCardData } from "../../contexts/CreditCardDataContext";

export default function CreditCardPreview() {
  return (
    <div className={styles.preview}>
      <picture>
        <source srcset={mobileBackground} media="(max-width: 56.25rem)" />
        <img
          src={desktopBackground}
          alt="background"
          className={styles.background}
        />
      </picture>
      <section className={styles.cards}>
        <CreditCardFront />
        <CreditCardBack />
      </section>
    </div>
  );
}

export function CreditCardFront() {
  const creditCardData = useCreditCardData();
  return (
    <div className={styles["card-front"]}>
      <img src={cardFront} alt="card-front" className={styles.card__image} />
      <div className={styles["card-front__data"]}>
        <div className={styles["card-front__top"]}>
          <svg
            viewBox="0 0 84 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["card-front__logo"]}
          >
            <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" />
            <path
              d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
              stroke="#fff"
            />
          </svg>
        </div>
        <div className={styles["card-front__details"]}>
          <span className={styles.card__number}>
            {creditCardData.cardNumber}
          </span>

          <div>
            <span className={styles.card__cardholderName}>
              {creditCardData.cardholderName}
            </span>
            <span className={styles.card__expDate}>
              {creditCardData.expMonth}/{creditCardData.expYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreditCardBack() {
  const creditCardData = useCreditCardData();
  return (
    <div className={styles["card-back"]}>
      <img src={cardBack} alt="card-back" className={styles.card__image} />
      <div className={styles["card-back__data"]}>
        <span className={styles.card__cvc}>{creditCardData.cvc}</span>
      </div>
    </div>
  );
}
