import { HashLink as Link } from "react-router-hash-link";
import style from "./footer.module.scss";
import logo from "../../img/logo.svg";

import mir from "../../img/mir.svg";
import mc from "../../img/mc.svg";
import visa from "../../img/visa.svg";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.info}>
        <img src={logo} alt="Логотип" />
        <ul>
          <li>ООО "Диджитал Партнерс"</li>
          <li>ОГРН 1227700617870</li>
          <li>ИНН 9731100374</li>
        </ul>
        <p>© 2023 quickvery.ru</p>
      </div>
      <div className={style.nav}>
        <h3>Навигация</h3>
        <nav>
          <ul>
            <Link to="/#advantages">
              <li>Преимущества</li>
            </Link>
            <Link to="/#region">
              <li>Области доставки</li>
            </Link>
            <Link to="/#delivery">
              <li>Виды доставки</li>
            </Link>
            <Link to="/#how">
              <li>Как работает?</li>
            </Link>
            <Link to="/#tarifs">
              <li>Тариф</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className={style.docs}>
        <h3>Документы</h3>
        <nav>
          <ul>
            <a href="https://quickvery.ru/docs/oferta.pdf">
              <li>Оферта</li>
            </a>
            <a href="https://quickvery.ru/docs/contract.pdf">
              <li>Договор оказания услуг</li>
            </a>
            <a href="https://quickvery.ru/docs/secure.pdf">
              <li>Безопасная сделка</li>
            </a>
            <a href="https://quickvery.ru/docs/rules.pdf">
              <li>Правила использования ПО «Quickvery.ru»</li>
            </a>
            <a href="https://quickvery.ru/docs/privacy.pdf">
              <li>Политика обработки персональных данных</li>
            </a>
          </ul>
        </nav>
      </div>
      <div className={style.contacts}>
        <h3>Контакты</h3>

        <p>+7 (495) 148-71-49</p>
        <p>info-digitalpartner@yandex.com</p>
      </div>

      <div className={style.adress}>
        <h3>Контакты</h3>
        <p>г. Москва, ул. Авиамоторная, д.55, к.31, этаж 3, офис 3610</p>
        <div className="flex">
          <img src={mir} width={100} alt="Мир" />
          <img src={mc} width={100} alt="MasterCard" />
          <img src={visa} width={100} alt="Visa" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
