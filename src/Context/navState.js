import { createContext, useState } from "react";

export const MenuContext = createContext({
  isMenuOpen: true,
  toggleMenuMode: () => {},
});

const NavState = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenuMode() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenuMode }}>
      {children}
    </MenuContext.Provider>
  );
};

export default NavState;
