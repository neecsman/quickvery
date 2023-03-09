import { createContext, useState } from "react";

export const LocationContext = createContext({
  city: "Москва",
  toggleCity: () => {},
});

const LocationState = ({ children }) => {
  const [city, setCity] = useState("Москва");
  function toggleCity(name) {
    setCity(name);
    localStorage.setItem("city", name);
  }

  return (
    <LocationContext.Provider value={{ city, toggleCity }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationState;
