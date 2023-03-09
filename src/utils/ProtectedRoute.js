import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";

import { useLazyCheckAuthQuery } from "../redux/API/authApiSlice";
import { setCredentials } from "../redux/authSlice";

import { Loading } from "../Components";

const ProtectedRoute = ({ children }) => {
  const [trigger, { isLoading }] = useLazyCheckAuthQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const checkAuth = async () => {
    try {
      const data = await trigger().unwrap();
      dispatch(setCredentials(data));
    } catch (error) {
      console.log(error.data);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
