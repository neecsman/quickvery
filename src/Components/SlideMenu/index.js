import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { MenuContext } from "../../Context/navState";
import HamburgerButton from "../HamburgerButton/index.js";
import { useLogoutMutation } from "../../redux/API/authApiSlice";
import { setLogout } from "../../redux/authSlice";
import { Button } from "..";

import style from "./slide.module.scss";

const SlideMenu = () => {
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    logout().then();
    dispatch(setLogout());
    navigate("/");
  };

  document.body.style = `${isMenuOpen && "overflow: hidden; height: 100vh"};`;

  return (
    <nav
      style={{
        transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
        width: "100%",
      }}
      className={style.menu}
    >
      <HamburgerButton />
      <div onClick={toggleMenuMode} className={style.links}>
        <div className="w-full text-black">
          <Link to="/create-order">
            <Button auth>
              <span> Заказать доставку</span>
              <ion-icon name="create-outline"></ion-icon>
            </Button>
          </Link>

          <Link to="/candidate">
            <Button auth>
              <span>Стать курьером</span>
              <ion-icon name="accessibility-outline"></ion-icon>
            </Button>
          </Link>
        </div>
        <div className="w-full text-black">
          <Link to="/profile">
            <Button auth>
              <span>Профиль</span>
              <ion-icon name="person-outline"></ion-icon>
            </Button>
          </Link>
          <Link to="/orders">
            <Button auth>
              <span>Заказы</span>
              <ion-icon name="pricetag-outline"></ion-icon>
            </Button>
          </Link>
        </div>
        <div className="w-full">
          {user ? (
            <Link className="text-red" onClick={() => handleLogout()}>
              <Button auth>
                <span>Выход</span>
                <ion-icon name="exit-outline"></ion-icon>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button auth>
                <span>Войти</span>
                <ion-icon name="exit-outline"></ion-icon>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SlideMenu;
