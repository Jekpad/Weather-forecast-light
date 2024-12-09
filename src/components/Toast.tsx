import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const throwSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

const throwWarning = (message: string) => {
  toast.warn(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

const throwError = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

export const handleSuccess = (message: string) => {
  throwSuccess(message);
};

export const handleWarning = (message: string) => {
  throwWarning(message);
};

export const handleError = (message: string) => {
  throwError(message);
};

const Toast = () => {
  return <ToastContainer />;
};

export default Toast;
