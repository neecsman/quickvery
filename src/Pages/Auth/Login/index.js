import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button, Loading } from "../../../Components";
import { setCredentials } from "../../../redux/authSlice";
import { useLoginMutation } from "../../../redux/API/authApiSlice";

import style from "./login.module.scss";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    const id = toast.loading("Попытка авторизации 😎");
    try {
      const user = await login(value).unwrap();
      dispatch(setCredentials(user));
      navigate("/orders");
      toast.update(id, {
        render: "Привет! 🖐",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error);

      toast.update(id, {
        render: error.data.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      {isLoading ? (
        <Loading />
      ) : (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl mb-6 text-black">Вход</h1>
          <div className={style.form_group}>
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

              {errors.email && <p>Введите Вашу почту</p>}
            </div>
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
            <Button auth>Войти</Button>
          </div>

          <div className="flex justify-between text-white text-opacity-60 mt-4">
            <Link className="hover:text-green text-black" to="/registration">
              Регистрация
            </Link>
            <Link className="hover:text-green text-black" to="/recovery">
              Забыл пароль?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
