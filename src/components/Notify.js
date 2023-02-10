import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Notify({ position = "top-right", autoClose = 5000, hideProgressBar = false, newestOnTop = false, closeOnClick = true, rtl = false, pauseOnFocusLoss = true, draggable = true, pauseOnHover = true, theme = "light" }) {
    return (
        <ToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            newestOnTop={newestOnTop}
            closeOnClick={closeOnClick}
            rtl={rtl}
            pauseOnFocusLoss={pauseOnFocusLoss}
            draggable={draggable}
            pauseOnHover={pauseOnHover}
            theme={theme}
        />
    );
}

// import { toast } from "react-toastify";
// toast.success(data?.message || "Sucesso!") - toast.error(data?.message || "Erro!")
// <Notify />