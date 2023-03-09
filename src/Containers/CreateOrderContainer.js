import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  useCreateOrderMutation,
  useCalcOrderMutation,
} from "../redux/API/orderApiSlice";
import { useSendOrderMailMutation } from "../redux/API/mailApiSlice";

import { LocationContext } from "../Context/LocationContext";
import { CreateOrder } from "../Pages";

const CreateOrderContainer = () => {
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    payments_method: "cash",
    taking_amount: "250",
    time_delivery: "Как можно скорее",
    how_delivery: "6",
    total_weight: 1,
    payments_adress: 1,
  });

  const [createOrder] = useCreateOrderMutation();
  const [calcOrder] = useCalcOrderMutation();
  const [sendOrderMail] = useSendOrderMailMutation();

  const { city } = useContext(LocationContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.value || value });
  };

  const handleOnCalc = async () => {
    try {
      const orderInfo = await calcOrder(formData).unwrap();
      setFormData({
        ...formData,
        taking_amount: Math.floor(
          Number(orderInfo.order.payment_amount) +
            72 +
            (Number(orderInfo.order.payment_amount) / 100) * 20
        ),
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let timeout;
    timeout = setTimeout(handleOnCalc, 1000);
    return () => clearTimeout(timeout);
  }, [
    formData.adress_from,
    formData.adress_where,
    formData.total_weight,
    formData.object_price,
  ]);

  const onSubmit = async () => {
    if (!user.confirm) {
      toast.error(
        "Прежде чем сделать заказ, подтвердите, пожалуйста, Вашу почту!"
      );
      return;
    }
    console.log(formData);
    const id = toast.loading("Фромируем заказ...");
    try {
      const data = await createOrder(formData).unwrap();
      await sendOrderMail({ ...user, order_id: data.order.order_id });
      toast.update(id, {
        render: "Заказ сформирован!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate("/orders");
    } catch (error) {
      toast.update(id, {
        render: error.data.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <CreateOrder
      formData={formData}
      setFormData={setFormData}
      handleOnChange={handleOnChange}
      onSubmit={onSubmit}
      city={city}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      reset={reset}
      errors={errors}
      user={user}
    />
  );
};

export default CreateOrderContainer;
