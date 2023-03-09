import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { setCredentials } from "../../redux/authSlice";
import {
  useUpdateMutation,
  useActivateMutation,
} from "../../redux/API/authApiSlice";

import { Button, Loading } from "../../Components";

import style from "./profile.module.scss";

const Profile = () => {
  const [update, { isLoading }] = useUpdateMutation();
  const [activate] = useActivateMutation();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setUserInfo({ ...userInfo, ...user });
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    console.log(userInfo);
    const id = toast.loading("Обновляем ваши данные");
    try {
      const data = await update(userInfo).unwrap();
      dispatch(setCredentials(data));
      toast.update(id, {
        render: "Данные обновлены! 👍",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      toast.update(id, {
        render: `${error.data.message} 😱`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const resendConfirm = async () => {
    const id = toast.loading("Повторная отправка письма...");
    try {
      await activate({ id: user.id });
      toast.update(id, {
        render: "Письмо успешно отправлено 👍",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      toast.update(id, {
        render: `${error.data.message} 😱`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className={style.profile}>
      <div className={style.profile_title}>
        <h1>Профиль</h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        user && (
          <div className={style.profile_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {user.confirm ? (
                  <p className="text-green mb-8 text-start">
                    Аккаунт: подтвержден
                  </p>
                ) : (
                  <div className="flex flex-col items-start mb-8 text-center">
                    <p className="text-red">Аккаунт: не подтвержден</p>
                    <div className="flex mt-5">
                      <span className="text-sm opacity-60 font-light">
                        Письмо на почту отправлено
                      </span>
                      <div
                        onClick={() => resendConfirm()}
                        className="flex ml-2 text-green cursor-pointer hover:scale-105 active:scale-110 transition-all hover:rotate-180"
                      >
                        <ion-icon name="reload-outline"></ion-icon>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-wrap justify-center px-2">
                <label>Фамилия:</label>
                <div className="relative">
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    value={userInfo.lastname || ""}
                    {...register("lastname", {
                      required: true,
                      validate: (value) => value !== "",
                    })}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastname: e.target.value })
                    }
                  />
                  <span className="absolute text-black right-3 top-3">
                    <ion-icon name="pencil-sharp"></ion-icon>
                  </span>
                </div>
                <label>Имя:</label>
                <div className="relative">
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    value={userInfo.firstname || ""}
                    {...register("firstname", {
                      required: true,
                      validate: (value) => value !== "",
                    })}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstname: e.target.value })
                    }
                  />
                  <span className="absolute text-black right-3 top-3">
                    <ion-icon name="pencil-sharp"></ion-icon>
                  </span>
                </div>

                <label>Отчество:</label>
                <div className="relative">
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    value={userInfo.middlename || ""}
                    {...register("middlename", {
                      required: true,
                      validate: (value) => value !== "",
                    })}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, middlename: e.target.value })
                    }
                  />
                  <span className="absolute text-black right-3 top-3">
                    <ion-icon name="pencil-sharp"></ion-icon>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap-reverse justify-between">
                <div className="flex flex-col-reverse xl:flex-col w-full xl:flex-1 px-2">
                  <div className="flex flex-col">
                    <label>Номер телефона:</label>
                    <input readOnly type="text" value={user.phone} />
                  </div>
                  <div className="flex flex-col">
                    <label>Старый пароль:</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={userInfo.oldPassword}
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            oldPassword: e.target.value,
                          })
                        }
                      />
                      <span className="absolute text-black right-3 top-3">
                        <ion-icon name="pencil-sharp"></ion-icon>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full xl:flex-1 px-2">
                  <div className="flex flex-col">
                    <label>Email:</label>
                    <input readOnly type="text" value={user.email} />
                  </div>
                  <div className="flex flex-col">
                    <label>Новый пароль:</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={userInfo.newPassword}
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            newPassword: e.target.value,
                          })
                        }
                      />
                      <span className="absolute text-black right-3 top-3">
                        <ion-icon name="pencil-sharp"></ion-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center text-black">
                <Button onClick={() => onSubmit()} primary>
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
