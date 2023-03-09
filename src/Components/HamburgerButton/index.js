import { useContext } from "react";
import classnames from "classnames";
import { MenuContext } from "../../Context/navState";

import style from "./burger.module.scss";

const HamburgerButton = () => {
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);

  return (
    <button
      className={classnames(`${style.burger}`, { active: isMenuOpen })}
      onClick={() => toggleMenuMode()}
    >
      <span className="burger-btn-line"></span>
      <span className="burger-btn-line"></span>
      <span className="burger-btn-line"></span>
    </button>
  );
};

export default HamburgerButton;
