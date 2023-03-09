import { HashLink as Link } from "react-router-hash-link";

import { Button } from "../../Components";
import { Feedback } from "../../Layouts";

import style from "./main.module.scss";

import region from "../../img/region.jpg";
import cash from "../../img/cash.png";
import card from "../../img/card.png";

const Home = () => {
  return (
    <>
      <main className={style.main}>
        <div className={style.main__container}>
          <div className={style.main__container_left}>
            <h1>Срочная курьерская доставка</h1>
            <p>Выгодные транспортные решения, быстрые сроки и низкие тарифы.</p>
            <Link to="/create-order">
              <Button xl>Заказать доставку</Button>
            </Link>
          </div>
        </div>
      </main>
      <section id="advantages" className={style.advantages}>
        <h2 className={style.advantages_title}>Преимущества</h2>
        <div className={style.advantages_block}>
          <div>
            <h3>35 минут</h3>
            <p>Среднее время доставки по городу</p>
          </div>
          <div>
            <h3>97 %</h3>
            <p>Успешность выполнения заявок</p>
          </div>
          <div>
            <h3>от 350 ₽</h3>
            <p>Стоимость курьерской доставки по городу</p>
          </div>
        </div>
      </section>
      <section id="region" className={style.region}>
        <div className="flex bg-gray rounded-3xl">
          <div className={style.region_right}>
            <h2>Области доставки</h2>
            <ul>
              <li>Санкт-Петербург</li>
              <li>Нижний Новгород</li>
              <li>Екатеринбург</li>
              <li>Новосибирск</li>
              <li>Москва и Московская область</li>
            </ul>
          </div>
          <div className={style.region_left}>
            <img src={region} alt="Регионы длоставки" />
          </div>
        </div>
      </section>
      <section id="delivery" className={style.delivery}>
        <h2>Виды доставки</h2>
        <div className={style.delivery_container}>
          <div className={style.delivery_clothes}>
            <p>Одежда</p>
          </div>
          <div className={style.delivery_docs}>
            <p>Документы</p>
          </div>
          <div className={style.delivery_products}>
            <p>Продукты</p>
          </div>
          <div className={style.delivery_gifts}>
            <p>Подарки</p>
          </div>
          <div className={style.delivery_medical}>
            <p>Лекарства</p>
          </div>
          <div className={style.delivery_internet}>
            <p>Интернет-заказы</p>
          </div>
        </div>
      </section>
      <section id="how" className={style.how}>
        <div className="bg-gray p-20 rounded-xl">
          <h2 className="mb-10">Как работает наш сервис?</h2>
          <div className={style.how_container}>
            <div className={style.how_container_item}>
              <h3>1. Заявка</h3>
              <p>Создайте заказ через сайт или по номеру телефона</p>
            </div>
            <div className={style.how_container_item}>
              <h3>2. Оформление</h3>
              <p>
                В течение 2 минут вы получите расчет и уведомление о назначении
                курьера
              </p>
            </div>
            <div className={style.how_container_item}>
              <h3>3. Доставка</h3>
              <p>Курьер заберет заказ и оперативно доставит получателю</p>
            </div>
            <div className={style.how_container_item}>
              <h3>4. Оплата</h3>
              <p>Произведите оплату за доставку любым удобным способом</p>
            </div>
          </div>
        </div>
      </section>
      <section id="tarifs" className={style.tarifs}>
        <h2>Тарифы</h2>
        <div className={style.tarifs_container}>
          <div className={style.tarifs_container_item}>
            <div className={style.tarifs_container_item_header}>
              <h3>По городу</h3>
            </div>
            <div className={style.tarifs_container_item_body}>
              <ul>
                <li>Ночная доставка + 90 ₽</li>
                <li>
                  Перевоз крупногабаритных <br /> объектов + 200 ₽
                </li>
              </ul>
              <h3 className="text-3xl font-medium text-center">от 450 ₽</h3>
              <Link to="/create-order">
                <Button tarifs>Заказать доставку</Button>
              </Link>
            </div>
          </div>
          <div className={style.tarifs_container_item}>
            <div className={style.tarifs_container_item_header}>
              <h3>До 15 км от города</h3>
            </div>
            <div className={style.tarifs_container_item_body}>
              <ul>
                <li>Ночная доставка + 90 ₽</li>
                <li>
                  Перевоз крупногабаритных <br /> объектов + 400 ₽
                </li>
              </ul>
              <h3 className="text-3xl font-medium text-center">от 450 ₽</h3>
              <Link to="/create-order">
                <Button tarifs>Заказать доставку</Button>
              </Link>
            </div>
          </div>
          <div className={style.tarifs_container_item}>
            <div className={style.tarifs_container_item_header}>
              <h3>15 - 30 км от города</h3>
            </div>
            <div className={style.tarifs_container_item_body}>
              <ul>
                <li>Ночная доставка + 90 ₽</li>
                <li>
                  Перевоз крупногабаритных <br /> объектов + 600 ₽
                </li>
              </ul>
              <h3 className="text-3xl font-medium text-center">от 450 ₽</h3>
              <Link to="/create-order">
                <Button tarifs>Заказать доставку</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={style.payments}>
        <div className={style.payments_container}>
          <div className={style.payments_container_block}>
            <h2>Способы оплаты</h2>
            <p>
              Выберите удобный для себя способ оплаты и <br /> оплатите доставку
              при передачи груза курьеру.
            </p>
            <div className={style.payments_container_block_pay}>
              <div>
                <img src={cash} alt="Наличными" />
                <span>Наличными</span>
              </div>
              <div>
                <img src={card} alt="Картой" />
                <span>Картой</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Feedback />
    </>
  );
};

export default Home;
