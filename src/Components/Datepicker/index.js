import Datepicker from "tailwind-datepicker-react";

import { useState } from "react";

const CustomDatepicker = ({ setFormData, formData, start, end }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    start && setFormData({ ...formData, start_time: selectedDate });
    end && setFormData({ ...formData, end_time: selectedDate });
  };
  const handleClose = (state) => {
    setShow(state);
  };
  const options = {
    title: "Дата",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background:
        "dark:bg-black dark:border dark:border-white dark:rounded-2xl bg-white border border-white rounded-2xl",
      todayBtn: "bg-green",
      clearBtn: "bg-green",
      icons: "bg-green",
      text: "",
      disabledText: "bg-lightgray dark:bg-gray",
      input: "dark:text-black ",
      inputIcon: "hidden",
      selected: "bg-green",
    },
    icons: {
      prev: () => (
        <span>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </span>
      ),
      next: () => (
        <span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </span>
      ),
    },
    datepickerClassNames: "top-14 pt-0",
    defaultDate: new Date(),
    language: "ru",
  };
  return (
    <div className="relative datepicker">
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};

export default CustomDatepicker;
