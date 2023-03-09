import { useState } from "react";

import Spinner from "./";

const Calculate = ({ formData }) => {
  const [fixedAmount, setFixedAmount] = useState(true);

  window.onscroll = () => {
    if (
      window.scrollY + window.innerHeight <
      document.documentElement.scrollHeight - 380
    ) {
      setFixedAmount(true);
    } else {
      setFixedAmount(false);
    }
    return fixedAmount;
  };
  return (
    <>
      {fixedAmount && (
        <div className="fixed hidden xl:block left-20 bottom-0 bg-green rounded-t-xl min-w-64 p-5">
          <span className="text-white text-2xl font-semibold font-sans mb-8">
            {formData && formData.taking_amount
              ? `Итого: ${formData.taking_amount} руб.`
              : "Итого: 250 руб."}
          </span>
        </div>
      )}
      <span className="text-black text-2xl font-semibold font-sans">
        {formData && formData.taking_amount
          ? `Итого: ${formData.taking_amount} руб.`
          : "Итого: 250 руб."}
      </span>
    </>
  );
};

export default Calculate;
