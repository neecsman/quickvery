import style from "./modal.module.scss";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={`${style.modal} ${active && style.active}`}
      onClick={() => setActive(false)}
    >
      <div
        className={style.modal__container}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-5xl absolute right-4 top-1 hover:text-green"
          onClick={() => setActive(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
