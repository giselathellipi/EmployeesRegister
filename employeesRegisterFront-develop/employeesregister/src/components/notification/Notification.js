import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";
export const Notification = (type, message, autoClose) => {
  toast?.[type](message, {
    transition: Flip,
    autoClose: autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
  });
};