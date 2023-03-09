import { useEffect, useState } from "react";
import format from "date-fns/format";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  useLazyGetOrdersQuery,
  useCancelOrderMutation,
} from "../../redux/API/orderApiSlice";

import { Button, Loading } from "../../Components";
import style from "./orders.module.scss";

const Orders = () => {
  const [getOrders, { data = [], isLoading: isGetOrdersLoading }] =
    useLazyGetOrdersQuery();
  const [cancelOrder, { isLoading: isCancelOrderLoading }] =
    useCancelOrderMutation();

  const [width, setWidth] = useState(document.documentElement.clientWidth);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sort, setSort] = useState("all");

  const sortOrders = () => {
    if (sort === "all") {
      setFilteredOrders(orders);
    } else if (sort === "active") {
      setFilteredOrders(
        orders.filter(
          (item) => item.status !== "canceled" && item.status !== "completed"
        )
      );
    } else if (sort === "closed") {
      setFilteredOrders(orders.filter((item) => item.status === "completed"));
    }
  };

  const queryOrders = async () => {
    const data = await getOrders().unwrap();
    setOrders(data);
    setFilteredOrders(data);
  };

  const onCancelOrder = async (order_id) => {
    const id = toast.loading("Отменяем заказ");
    try {
      await cancelOrder({ order_id }).unwrap();
      queryOrders();
      toast.update(id, {
        render: "Заказ отменен 😓",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      toast.update(id, {
        render: "Упс, что-то пошло не так...🤔",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const handleResizeWindow = () =>
      setWidth(document.documentElement.clientWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  useEffect(() => {
    sortOrders();
  }, [sort, data]);

  useEffect(() => {
    queryOrders();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex justify-between mb-8">
        <h1 className="text-white text-5xl font-semibold">Заказы</h1>
      </div>
      <div className="flex justify-between items-center">
        {data.length ? (
          <div onChange={(e) => setSort(e.target.value)} className={style.sort}>
            <label>
              <input defaultChecked name="sort" type="radio" value="all" />
              <div>Все заказы</div>
            </label>
            <label>
              <input name="sort" type="radio" value="active" />
              <div>Активные</div>
            </label>
            <label>
              <input name="sort" type="radio" value="closed" />
              <div>Завершенные</div>
            </label>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col justify-center items-center mt-5 mb-56">
        {isGetOrdersLoading || isCancelOrderLoading ? (
          <Loading />
        ) : (
          <>
            {sort === "all" && (
              <>
                {filteredOrders.length ? (
                  <>
                    {width <= 900 ? (
                      <>
                        {filteredOrders.map((item) => {
                          return (
                            <div
                              key={item.order_id}
                              className="flex flex-col w-full bg-lightgray rounded-xl p-4 font-sans my-2"
                            >
                              <div className="flex justify-between">
                                <b>№ {item.order_id}</b>
                                <b>{item.backpayment_amount} ₽</b>
                              </div>
                              <div className="flex justify-between mt-5">
                                <b>{item.matter}</b>
                                <span>
                                  {format(
                                    new Date(
                                      item.points[0].required_finish_datetime
                                    ),
                                    `dd:MM:yyyy`
                                  )}
                                </span>
                              </div>
                              <div className="mt-5">
                                <p>1. {item.points[0].address}</p>
                                <p>2. {item.points[1].address}</p>
                              </div>
                              <div className="flex justify-between items-center mt-5">
                                <b>Отменен</b>
                                {item.status === "canceled" ? (
                                  <Link to="/create-order">
                                    <Button repeat>Повторить</Button>
                                  </Link>
                                ) : (
                                  <Button
                                    onClick={() => onCancelOrder(item.order_id)}
                                    cancel
                                  >
                                    Отменить
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <table className={style.table}>
                        <thead>
                          <tr>
                            <th>Заказ</th>
                            <th>Создан</th>
                            <th>Время прибытия</th>
                            <th>Статус</th>
                            <th>Сумма</th>
                            <th>Адрес доставки</th>
                            <th>Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((item) => {
                            return (
                              <tr key={item.order_id}>
                                <td>{item.order_id}</td>
                                <td>
                                  <span>
                                    {" "}
                                    {format(
                                      new Date(item.created_datetime),
                                      `dd:MM:yyyy`
                                    )}
                                  </span>
                                  <br />
                                  {format(
                                    new Date(item.created_datetime),
                                    `hh:mm`
                                  )}
                                </td>
                                <td>
                                  <span>
                                    {" "}
                                    {format(
                                      new Date(
                                        item.points[0].required_finish_datetime
                                      ),
                                      `dd:MM:yyyy`
                                    )}
                                  </span>
                                  <br />
                                  {format(
                                    new Date(
                                      item.points[0].required_finish_datetime
                                    ),
                                    `hh:mm`
                                  )}
                                </td>
                                <td>
                                  {item.status_description ===
                                  "Cancelled via API"
                                    ? "Отменен"
                                    : item.status_description}
                                </td>
                                <td>{item.backpayment_amount} ₽</td>
                                <td>
                                  1. {item.points[0].address} <br /> <br /> 2.{" "}
                                  {item.points[1].address}
                                </td>
                                <td>
                                  {item.status === "canceled" ? (
                                    <Link to="/create-order">
                                      {" "}
                                      <Button repeat>Повторить</Button>
                                    </Link>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        onCancelOrder(item.order_id)
                                      }
                                      cancel
                                    >
                                      Отменить
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center h-[30vh]">
                    <span className="text-gray text-3xl font-bold mb-12">
                      Вы еще не сделали ни одного заказа
                    </span>
                    <Link to="/create-order">
                      <Button xl>Заказать доставку</Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            {sort === "active" && (
              <>
                {filteredOrders.length ? (
                  <>
                    {width <= 900 ? (
                      <>
                        {filteredOrders.map((item) => {
                          return (
                            <div
                              key={item.order_id}
                              className="flex flex-col w-full bg-lightgray rounded-xl p-4 font-sans my-2"
                            >
                              <div className="flex justify-between">
                                <b>№ {item.order_id}</b>
                                <b>{item.backpayment_amount} ₽</b>
                              </div>
                              <div className="flex justify-between mt-5">
                                <b>{item.matter}</b>
                                <span>
                                  {format(
                                    new Date(
                                      item.points[0].required_finish_datetime
                                    ),
                                    `dd:MM:yyyy`
                                  )}
                                </span>
                              </div>
                              <div className="mt-5">
                                <p>1. {item.points[0].address}</p>
                                <p>2. {item.points[1].address}</p>
                              </div>
                              <div className="flex justify-between items-center mt-5">
                                <b>Отменен</b>
                                {item.status === "canceled" ? (
                                  <Link to="/create-order">
                                    <Button repeat>Повторить</Button>
                                  </Link>
                                ) : (
                                  <Button
                                    onClick={() => onCancelOrder(item.order_id)}
                                    cancel
                                  >
                                    Отменить
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <table className={style.table}>
                        <thead>
                          <tr>
                            <th>Заказ</th>
                            <th>Создан</th>
                            <th>Время прибытия</th>
                            <th>Статус</th>
                            <th>Сумма</th>
                            <th>Адрес доставки</th>
                            <th>Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((item) => {
                            return (
                              <tr key={item.order_id}>
                                <td>{item.order_id}</td>
                                <td>
                                  <span>
                                    {" "}
                                    {format(
                                      new Date(item.created_datetime),
                                      `dd:MM:yyyy`
                                    )}
                                  </span>
                                  <br />
                                  {format(
                                    new Date(item.created_datetime),
                                    `hh:mm`
                                  )}
                                </td>
                                <td>
                                  <span>
                                    {" "}
                                    {format(
                                      new Date(
                                        item.points[0].required_finish_datetime
                                      ),
                                      `dd:MM:yyyy`
                                    )}
                                  </span>
                                  <br />
                                  {format(
                                    new Date(
                                      item.points[0].required_finish_datetime
                                    ),
                                    `hh:mm`
                                  )}
                                </td>
                                <td>
                                  {item.status_description ===
                                  "Cancelled via API"
                                    ? "Отменен"
                                    : item.status_description}
                                </td>
                                <td>{item.backpayment_amount} ₽</td>
                                <td>
                                  1. {item.points[0].address} <br /> <br /> 2.{" "}
                                  {item.points[1].address}
                                </td>
                                <td>
                                  {item.status === "canceled" ? (
                                    <Link to="/create-order">
                                      {" "}
                                      <Button repeat>Повторить</Button>
                                    </Link>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        onCancelOrder(item.order_id)
                                      }
                                      cancel
                                    >
                                      Отменить
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center h-[30vh]">
                    <span className="text-gray text-3xl font-bold mb-12">
                      Активных заказов нет
                    </span>
                  </div>
                )}
              </>
            )}
            {sort === "closed" && (
              <>
                {filteredOrders.length ? (
                  <>
                    {width <= 900 ? (
                      <>
                        {filteredOrders.map((item) => {
                          return (
                            <div
                              key={item.order_id}
                              className="flex flex-col w-full bg-lightgray rounded-xl p-4 font-sans my-2"
                            >
                              <div className="flex justify-between">
                                <b>№ {item.order_id}</b>
                                <b>{item.backpayment_amount} ₽</b>
                              </div>
                              <div className="flex justify-between mt-5">
                                <b>{item.matter}</b>
                                <span>
                                  {format(
                                    new Date(
                                      item.points[0].required_finish_datetime
                                    ),
                                    `dd:MM:yyyy`
                                  )}
                                </span>
                              </div>
                              <div className="mt-5">
                                <p>1. {item.points[0].address}</p>
                                <p>2. {item.points[1].address}</p>
                              </div>
                              <div className="flex justify-between items-center mt-5">
                                <b>Отменен</b>
                                {item.status === "canceled" ? (
                                  <Link to="/create-order">
                                    <Button repeat>Повторить</Button>
                                  </Link>
                                ) : (
                                  <Button
                                    onClick={() => onCancelOrder(item.order_id)}
                                    cancel
                                  >
                                    Отменить
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <table className={style.table}>
                        <thead>
                          <tr>
                            <th>Заказ</th>
                            <th>Создан</th>
                            <th>Время прибытия</th>
                            <th>Статус</th>
                            <th>Сумма</th>
                            <th>Адрес доставки</th>
                            <th>Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((item) => {
                            return (
                              <tr key={item.order_id}>
                                <td>{item.order_id}</td>
                                <td>
                                  <span>
                                    {" "}
                                    {format(
                                      new Date(item.created_datetime),
                                      `dd:MM:yyyy`
                                    )}
                                  </span>
                                  <br />
                                  {format(
                                    new Date(item.created_datetime),
                                    `hh:mm`
                                  )}
                                </td>
                                <td>
                                  <span>
                                    {" "}
                                    {format(
                                      new Date(
                                        item.points[0].required_finish_datetime
                                      ),
                                      `dd:MM:yyyy`
                                    )}
                                  </span>
                                  <br />
                                  {format(
                                    new Date(
                                      item.points[0].required_finish_datetime
                                    ),
                                    `hh:mm`
                                  )}
                                </td>
                                <td>
                                  {item.status_description ===
                                  "Cancelled via API"
                                    ? "Отменен"
                                    : item.status_description}
                                </td>
                                <td>{item.backpayment_amount} ₽</td>
                                <td>
                                  1. {item.points[0].address} <br /> <br /> 2.{" "}
                                  {item.points[1].address}
                                </td>
                                <td>
                                  {item.status === "canceled" ? (
                                    <Link to="/create-order">
                                      {" "}
                                      <Button repeat>Повторить</Button>
                                    </Link>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        onCancelOrder(item.order_id)
                                      }
                                      cancel
                                    >
                                      Отменить
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center h-[30vh]">
                    <span className="text-gray text-3xl font-bold mb-12">
                      Завершенных заказов нет
                    </span>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
