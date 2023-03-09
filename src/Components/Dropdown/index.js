import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/authSlice";
import { Button } from "../";
import { useLogoutMutation } from "../../redux/API/authApiSlice";
import style from "./dropdown.module.scss";

const Dropdown = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    logout().then();
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <div className={style.dropdown}>
      <Button profile></Button>
      <div className={style.dropdown_nav}>
        <ul>
          <Link to="/orders">
            <li>
              Заказы
              <ion-icon name="pricetag-outline"></ion-icon>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              Профиль
              <ion-icon name="person-outline"></ion-icon>
            </li>
          </Link>
          {user ? (
            <Link onClick={() => handleLogout()}>
              <li>
                Выйти<ion-icon name="exit-outline"></ion-icon>
              </li>
            </Link>
          ) : (
            <Link to="/login">
              <li>
                Войти<ion-icon name="exit-outline"></ion-icon>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
