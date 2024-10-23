import React from "react";
import styles from "./CreditCardDetailsPage.module.css";
import CreditCardForm from "../components/Forms/CreditCardForm/CreditCardForm";
import CreditCardPreview from "../components/CreditCardPreview/CreditCardPreview";
import { CreditCardDataProvider } from "../contexts/CreditCardDataContext";

export default function CreditCardDetailsPage() {
  return (
    <section className={styles.layout}>
      <CreditCardDataProvider>
        <CreditCardPreview />
        <CreditCardForm />
      </CreditCardDataProvider>
    </section>
  );
}
