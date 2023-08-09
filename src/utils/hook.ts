import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { toast } from "react-toastify";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//Util function

const funcUtils = {
  notify: (content: string, type: "error" | "warning" | "success") => {
    const option: any = {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };

    if (!content)
      return toast.error("Có lỗi vui lòng liên hệ quản trị viên!", option);

    switch (type) {
      case "error":
        return toast.error(content, option);

      case "warning":
        return toast.warning(content, option);

      case "success":
        return toast.success(content, option);

      default:
        break;
    }
  },
};

export { funcUtils };
