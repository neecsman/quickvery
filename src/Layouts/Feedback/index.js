import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../Components";
import { useSendFeedbackMailMutation } from "../../redux/API/mailApiSlice";

import style from "./feedback.module.scss";

function Feedback() {
  const [sendFeedbackMail] = useSendFeedbackMailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const id = toast.loading("Отправляем ваше письмо...");
    try {
      await sendFeedbackMail(data);
      toast.update(id, {
        render: "Письмо успешно отправлено!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset();
    } catch (error) {
      toast.update(id, {
        render: "Упс, что-то пошло не так...",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <section className={style.feedback}>
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Почта:</label>
        <input
          placeholder="example@yandex.com"
          type="email"
          {...register("email", {
            required: true,
            validate: (value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value),
          })}
        />
        {errors.email && <p>Введите корректный почтовый адрес</p>}
        <label>Заголовок:</label>
        <input
          placeholder="Введите тему письма"
          type="text"
          {...register("title", {
            required: true,
            validate: (value) => value !== "",
          })}
        />
        {errors.title && <p>Введите тему письма</p>}
        <label>Сообщение:</label>
        <textarea
          rows="4"
          placeholder="Введите сообщение"
          type="text"
          {...register("text", {
            required: true,
            validate: (value) => value !== "",
          })}
        />
        {errors.text && <p>Пустое сообщение нельзя отправить</p>}

        <Button xl type="submit">
          Отправить
        </Button>
      </form>
    </section>
  );
}

export default Feedback;
