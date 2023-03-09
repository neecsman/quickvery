import { Controller } from "react-hook-form";

import { Button, CustomDatepicker, Calculate } from "../../Components";
import PhoneInput from "react-phone-input-2";
import InputMask from "react-input-mask";
import { AddressSuggestions } from "react-dadata";

import style from "./order.module.scss";

const CreateOrder = ({
  formData,
  setFormData,
  handleOnChange,
  onSubmit,
  register,
  handleSubmit,
  control,
  errors,
  city,
  user,
}) => {
  return (
    <div className={style.order}>
      <h1>Заказ</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={(e) => handleOnChange(e)}
        className={style.form}
      >
        {/* <h2>Контактные данные заказчика:</h2>

        <div className={style.form_group}>
          <div>
            <label>Фамилия:</label>
            <input
              type="text"
              {...register("lastname", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="Иванов"
            />

            {errors.lastname && <p>Введите Вашу фамилию</p>}
          </div>
          <div>
            <label>Имя:</label>
            <input
              type="text"
              {...register("firstname", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="Петр"
            />
            {errors.firstname && <p>Введите Ваше имя</p>}
          </div>
        </div>
        <div className={style.form_group}>
          <div>
            <label>Отчество:</label>
            <input
              type="text"
              {...register("middlename", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="Алексеевич"
            />
            {errors.middlename && <p>Введите Ваше отчество</p>}
          </div>
          <div className={style.tel}>
            <label>Номер телефона:</label>
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <PhoneInput
                    placeholder="+7 (999) 999-99-99"
                    onChange={onChange}
                    value={value}
                    country={"ru"}
                    disableDropdown={true}
                    inputProps={{
                      name: "customer",
                    }}
                    inputStyle={{ fontFamily: "sans-serif" }}
                  />
                </>
              )}
            />
            {errors["phone"] && <p>Введите Ваш номер телефона</p>}
          </div>
        </div>
        <div className={style.form_group}>
          <div>
            <label>Почта:</label>
            <input
              {...register("email", {
                required: true,
                validate: (value) => value !== "",
              })}
              type="email"
              placeholder="ivaninf@yandex.com"
              style={{
                width: "100%",
              }}
            />

            {errors.email && <p>Введите Вашу почту</p>}
          </div>
        </div>

        <h2>Информация о доставке:</h2> */}

        <div className={style.form_selector}>
          <label>Когда доставить:</label>
          <div>
            <label>
              <input
                type="radio"
                name="time_delivery"
                value="Как можно скорее"
                defaultChecked
              />
              <div>Как можно скорее</div>
            </label>
            <label>
              <input type="radio" name="time_delivery" value="Запланировать" />
              <div>Запланировать</div>
            </label>
            <label>
              <input
                type="radio"
                disabled
                name="time_delivery"
                value="Интервал"
              />
              <div>Интервал</div>
            </label>
            {formData.time_delivery === "Интервал" && (
              <div>
                <label>Укажите интервал:</label>
                <input
                  {...register("interval", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  type="text"
                  placeholder="01.01.2023 - 03.01.20223"
                />
                {errors.interval && <p>Укажите интервал даты</p>}
              </div>
            )}
          </div>
        </div>

        <div>
          {formData.time_delivery !== "Интервал" && (
            <div className={style.form_selector}>
              <label>Как доставить:</label>
              <div>
                <label>
                  <input
                    defaultChecked
                    type="radio"
                    name="how_delivery"
                    value="6"
                  />
                  <div>Пешком</div>
                </label>
                <label>
                  <input type="radio" name="how_delivery" value="7" />
                  <div>Легковой автомобиль</div>
                </label>
                <label>
                  <input type="radio" name="how_delivery" value="5" />
                  <div>Грузовой автомобиль</div>
                </label>
              </div>
            </div>
          )}

          {formData.how_delivery === "6" &&
            formData.time_delivery !== "Интервал" && (
              <div className={style.form_selector}>
                <label>Вес посылки:</label>
                <div>
                  <label>
                    <input
                      defaultChecked
                      type="radio"
                      name="total_weight"
                      value="1"
                    />
                    <div>до 1 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="5" />
                    <div>до 5 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="10" />
                    <div>до 10 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="15" />
                    <div>до 15 кг</div>
                  </label>
                </div>
              </div>
            )}
          {formData.how_delivery === "7" &&
            formData.time_delivery !== "Интервал" && (
              <div className={style.form_selector}>
                <label>Вес посылки:</label>
                <div>
                  <label>
                    <input type="radio" name="total_weight" value="50" />
                    <div>до 50 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="100" />
                    <div>до 100 кг</div>
                  </label>
                  <label className="check option">
                    <input type="radio" name="total_weight" value="150" />
                    <div>до 150 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="200" />
                    <div>до 200 кг</div>
                  </label>
                </div>
              </div>
            )}
          {formData.how_delivery === "5" &&
            formData.time_delivery !== "Интервал" && (
              <div className={style.form_selector}>
                <label>Вес посылки:</label>
                <div>
                  <label>
                    <input type="radio" name="total_weight" value="500" />
                    <div>до 500 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="700" />
                    <div>до 700 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="1000" />
                    <div>до 1000 кг</div>
                  </label>
                  <label>
                    <input type="radio" name="total_weight" value="1500" />
                    <div>до 1500 кг</div>
                  </label>
                </div>
              </div>
            )}
        </div>

        <h2>Отправление:</h2>

        <div className={style.form_group}>
          <div>
            <label>От кого:</label>
            <input
              type="text"
              {...register("name_from", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="Иван"
            />
            {errors.name_from && <p>Введите Имя</p>}
          </div>
          <div className={style.tel}>
            <label>Номер телефона:</label>
            <Controller
              control={control}
              name="phone_from"
              rules={{
                required: true,
                onChange: (e) =>
                  setFormData({
                    ...formData,
                    phone_from:
                      e.target.value.lenght > 10
                        ? e.target.value.slice(0, -1)
                        : e.target.value,
                  }),
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <PhoneInput
                    placeholder="+7 999 999 99 99"
                    onChange={onChange}
                    value={value}
                    country={"ru"}
                    disableDropdown={true}
                    inputProps={{
                      name: "phone_from",
                    }}
                    inputStyle={{ fontFamily: "sans-serif" }}
                  />
                </>
              )}
            />
            {errors["phone_from"] && <p>Введите корректный номер телефона</p>}
          </div>
        </div>
        <div className={style.form_group}>
          <div className={style.adress}>
            {formData.time_delivery === "Запланировать" && (
              <>
                <label>Начать:</label>
                <CustomDatepicker
                  formData={formData}
                  setFormData={setFormData}
                  start
                />
              </>
            )}
            <label>Адрес:</label>
            <Controller
              control={control}
              name="adress_from"
              render={({ field }) => (
                <AddressSuggestions
                  {...register("adress_from", {
                    required: true,
                    validate: (value) => value !== "",
                    onChange: (e) => handleOnChange(e),
                  })}
                  {...field}
                  count={5}
                  filterLocations={[
                    {
                      city,
                    },
                  ]}
                  inputProps={{
                    placeholder: "г. Москва ул. Новый Арбат 12",
                    style: { width: "100%" },
                    name: "adress_from",
                  }}
                  token="eb9dbc9d8b76b68399bd5aa3a3e5c7c31557e11d"
                />
              )}
            />
            {errors.adress_from && (
              <p>Укажите откуда забрать посылку в пределах города</p>
            )}
          </div>
        </div>
        <div className={style.form_group}>
          <div className="group_item">
            <label>Комментарий:</label>
            <textarea
              type="text"
              {...register("note_from")}
              placeholder="Укажите комментарий для курьера"
              rows={4}
            />
          </div>
        </div>

        <h2>Получение:</h2>

        <div className={style.form_group}>
          <div>
            <label>Кому:</label>
            <input
              type="text"
              {...register("name_where", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="Петр"
            />
            {errors.name_from && <p>Введите Имя получателя</p>}
          </div>
          <div className={style.tel}>
            <label>Номер телефона:</label>
            <Controller
              control={control}
              name="phone_where"
              rules={{
                required: true,
                onChange: (e) =>
                  setFormData({
                    ...formData,
                    phone_where:
                      e.target.value.lenght > 10
                        ? e.target.value.slice(0, -1)
                        : e.target.value,
                  }),
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <PhoneInput
                    placeholder="+7 (999) 999-99-99"
                    onChange={onChange}
                    value={value}
                    country={"ru"}
                    disableDropdown={true}
                    inputProps={{
                      name: "phone_where",
                    }}
                    inputStyle={{ fontFamily: "sans-serif" }}
                  />
                </>
              )}
            />
            {errors["phone_where"] && <p>Введите корректный номер телефона</p>}
          </div>
        </div>
        <div className={style.form_group}>
          <div className={style.adress}>
            {formData.time_delivery === "Запланировать" && (
              <>
                <label>Закончить:</label>
                <CustomDatepicker
                  formData={formData}
                  setFormData={setFormData}
                  end
                />
              </>
            )}
            <label>Адрес:</label>

            <Controller
              control={control}
              name="adress_where"
              render={({ field }) => (
                <>
                  <AddressSuggestions
                    containerClassName="form_adress"
                    {...register("adress_where", {
                      required: true,
                      validate: (value) =>
                        value !== "" && value[2] !== formData.adress_from[2],
                      onChange: (e) => handleOnChange(e),
                    })}
                    {...field}
                    count={5}
                    filterLocations={[
                      {
                        city,
                      },
                    ]}
                    inputProps={{
                      placeholder: "г. Москва ул. Новый Арбат 12",
                      style: { width: "100%" },
                      name: "adress_where",
                    }}
                    token="eb9dbc9d8b76b68399bd5aa3a3e5c7c31557e11d"
                  ></AddressSuggestions>
                </>
              )}
            />
            {errors["adress_where"] && (
              <p>Укажите куда привезти посылку в пределах города</p>
            )}
          </div>
        </div>
        <div className={style.form_group}>
          <div>
            <label>Комментарий:</label>
            <textarea
              type="text"
              {...register("note_where")}
              placeholder="Укажите комментарий для курьера"
              rows={4}
            />
          </div>
        </div>

        <h2>Информация о грузе:</h2>
        <div className={style.form_group}>
          <div>
            <label>Что везем:</label>
            <input
              type="text"
              {...register("object", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="Лекарства, продукты, книги..."
            />
            {errors.object && <p>Укажите что будем везти</p>}
          </div>
        </div>
        <div className={style.form_group}>
          <div>
            <label>Примерные габариты груза:</label>

            <Controller
              control={control}
              name="size"
              rules={{ required: true }}
              render={({ field: { ref } }) => (
                <>
                  <InputMask
                    {...register("size", {
                      required: true,
                      validate: (value) => value !== "",
                    })}
                    name="size"
                    mask="99х99х99см"
                    maskChar={null}
                    placeholder="Например 30х30х30см"
                  >
                    {(inputProps) => <input {...inputProps} type="text" />}
                  </InputMask>
                </>
              )}
            />
            {errors.size && <p>Укажите габариты груза</p>}
          </div>
        </div>
        <div className={style.form_group}>
          <div>
            <label>Оценточная стоимость груза:</label>
            <input
              type="number"
              {...register("object_price", {
                required: true,
                validate: (value) => value !== "",
              })}
              placeholder="до 10000 руб."
              max={10000}
            />
            {errors.object_price && <p>Укажите оценочную стоимость груза</p>}
          </div>
        </div>

        <h2>Способ оплаты:</h2>

        <div className={style.form_selector}>
          <div>
            <label>
              <input type="radio" name="payments" defaultChecked value="cash" />
              <div>Картой курьеру</div>
            </label>
            <label>
              <input disabled type="radio" name="payments" value="card" />
              <div>Онлайн (временно недоступна)</div>
            </label>
          </div>
        </div>
        {formData.adress_from && formData.adress_where && (
          <>
            <h2>Оплата по адресу:</h2>
            <div className={style.where_pay}>
              <div>
                <label>
                  <input
                    type="radio"
                    onChange={(e) => handleOnChange(e)}
                    name="payments_adress"
                    value="1"
                    defaultChecked
                  />
                  <div> 1. {formData.adress_from}</div>
                </label>

                <label>
                  <input
                    type="radio"
                    onChange={(e) => handleOnChange(e)}
                    name="payments_adress"
                    value="2"
                  />
                  <div> 2. {formData.adress_where}</div>
                </label>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-wrap justify-center items-end xl:justify-between">
          <Calculate formData={formData} />
          <div className="mt-10 xl:mt-0">
            <Button xl>Заказать доставку</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
