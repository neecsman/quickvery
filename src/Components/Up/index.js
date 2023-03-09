import { useState, useEffect } from "react";
import style from "./up.module.scss";
const Up = () => {
  const [showButton, setshowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setshowButton(true);
      } else {
        setshowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button onClick={() => scrollToTop()} className={style.scroll}>
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      )}
    </>
  );
};

export default Up;
