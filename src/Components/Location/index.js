import { useState, useContext, useEffect } from "react";
import { LocationContext } from "../../Context/LocationContext";
import Modal from "../Modal";

import style from "./location.module.scss";
import loc from "../../img/location.svg";

const Location = () => {
  const [active, setActive] = useState(false);
  const { city, toggleCity } = useContext(LocationContext);

  useEffect(() => {
    if (!localStorage.getItem("city")) {
      setActive(true);
    }
  }, []);

  return (
    <>
      <button className={style.location} onClick={() => setActive(true)}>
        <img src={loc} alt="Регион" />
        {localStorage.getItem("city") ? localStorage.getItem("city") : city}
      </button>

      <Modal active={active} setActive={setActive}>
        <div className={style.popup__header}>
          <h1>Ваш регион доставки</h1>
        </div>
        <div className={style.popup__list}>
          <ul
            onClick={(e) => {
              toggleCity(e.target.innerText);
              setActive(false);
            }}
          >
            <li>Москва</li>
            <li>Санкт-Петербург</li>
            <li>Краснодар</li>
            <li>Новосибирск</li>
          </ul>
          <ul
            onClick={(e) => {
              toggleCity(e.target.innerText);
              setActive(false);
            }}
          >
            <li>Екатеринбург</li>
            <li>Казань</li>
            <li>Челябинск</li>
            <li>Омск</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Location;
