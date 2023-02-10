import { Bounce, Slide, Zoom, Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// position = 'top-left' | 'top-right' | 'top-center' | ''bottom-left' | 'bottom-right | 'bottom-center'
// type = 'info' | 'success' | 'warning' | 'error' | 'default'
// theme = 'light' | 'dark' | 'colored'
// autoClose = milliseconds
// transition = 'bounce' | 'slide' | 'zoom' | 'flip'

const Transition = (type) => {
    if(type === "bounce") return Bounce
    else if(type === "slide") return Slide
    else if(type === "zoom") return Zoom
    else if(type === "flip") return Flip
    else return Bounce
}

const Notify = ({ position = "top-right", autoClose = 5000, transition = "flip", hideProgressBar = false, newestOnTop = false, closeOnClick = true, rtl = false, pauseOnFocusLoss = true, draggable = true, pauseOnHover = true, theme = "colored" }) => {
    return (
        <ToastContainer
            position={position}
            autoClose={autoClose}
            transition={Transition(transition.toLowerCase())}
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

export default Notify;