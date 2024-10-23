import { createContext, useContext, useState } from "react";

const CreditCardDataContext = createContext();
const CreditCardUpdateContext = createContext();

export const useCreditCardData = () => useContext(CreditCardDataContext);
export const useCreditCardUpdate = () => useContext(CreditCardUpdateContext);

const initialCreditCardData = {
  cardholderName: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  expMonth: "00",
  expYear: "00",
  cvc: "000",
};

export function CreditCardDataProvider({ children }) {
  const [creditCardData, setCreditCardData] = useState(initialCreditCardData);

  const updateCreditCardData = (newData) => {
    setCreditCardData((prev) => {
      return {
        ...prev,
        ...Object.fromEntries(
          Object.entries(newData).map(([key, value]) => [
            key,
            value === "" ? initialCreditCardData[key] : value,
          ])
        ),
      };
    });
  };

  return (
    <CreditCardDataContext.Provider value={creditCardData}>
      <CreditCardUpdateContext.Provider value={updateCreditCardData}>
        {children}
      </CreditCardUpdateContext.Provider>
    </CreditCardDataContext.Provider>
  );
}
