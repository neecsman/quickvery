import React from "react";

const Spinner = () => {
  return (
    <div className="text-5xl animate-spin flex justify-center items-center">
      <ion-icon name="reload-circle-outline"></ion-icon>
    </div>
  );
};

export default Spinner;
