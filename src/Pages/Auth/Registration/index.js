import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";

import { useRegistrationMutation } from "../../../redux/API/authApiSlice";
import { setCredentials } from "../../../redux/authSlice";

import { Button, Loading } from "../../../Components";
import style from "./registration.module.scss";

const Registration = () => {
  const [registration, { isLoading }] = useRegistrationMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    console.log(value);
    const id = toast.loading("Регистрируем вас 😎");
    try {
      const user = await registration(value).unwrap();
      dispatch(setCredentials(user));
      toast.update(id, {
        render: "Вы успешно зарегистрированы! 🤩",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.data.message} 😱`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center py-10 xl:py-20">
      {isLoading ? (
        <Loading />
      ) : (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-black text-center text-3xl mb-6">Регистрация</h1>
          <div className={style.form_group}>
            <div>
              <div>
                <label>Имя:</label>
                <input
                  {...register("firstname", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  type="name"
                  placeholder="Ваше имя"
                />

                {errors.firstname && <p>Введите имя</p>}
              </div>
              <div>
                <label>Фамилия:</label>
                <input
                  {...register("lastname", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  type="name"
                  placeholder="Ваше фамилия"
                />

                {errors.lastname && <p>Введите фамилию</p>}
              </div>
            </div>
            <div>
              <div>
                <label>Отчество:</label>
                <input
                  {...register("middlename", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  type="name"
                  placeholder="Ваше отчество"
                />

                {errors.middlename && <p>Введите отчество</p>}
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
                      />
                    </>
                  )}
                />
                {errors["phone"] && <p>Введите номер телефона</p>}
              </div>
            </div>
            <div>
              <div>
                <label>E-mail:</label>
                <input
                  {...register("email", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  type="email"
                  placeholder="ivaninf@yandex.com"
                />

                {errors.email && <p>Введите почту</p>}
              </div>
            </div>
            <div>
              <div>
                <label>Пароль:</label>
                <input
                  {...register("password", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  type="password"
                  placeholder="Пароль"
                />

                {errors.password && <p>Введите пароль</p>}
              </div>
            </div>
          </div>

          <div className="px-2">
            <Button auth>Зарегистрироваться</Button>
          </div>
          <div className="flex justify-between text-white text-opacity-60 mt-4 px-2">
            <Link className="hover:text-green text-black" to="/login">
              Вход
            </Link>
            <Link className="hover:text-green text-black" to="/recovery">
              Забыл пароль?
            </Link>
          </div>
          <div className="text-black opacity-60 mt-6">
            <p>
              Нажимая кнопку "Зарегистрироваться", Вы соглашаетесь с{" "}
              <a
                className="hover:underline"
                href="https://fastpoints.ru/docs/privacy.pdf"
              >
                политикой обработки персональных данных.
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Registration;
