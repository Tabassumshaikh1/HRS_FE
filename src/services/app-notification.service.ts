import { toast } from "react-toastify";
import { AppMessages } from "../data/app.constant";

export class AppNotificationService {
  showSucces(msg: string) {
    toast.success(msg, {
      autoClose: 2500,
      position: "bottom-right",
      theme: "colored",
      pauseOnHover: false,
    });
  }

  showError(error: any) {
    const msg: string = error?.response?.data?.message || error?.message || AppMessages.DEFAULT_ERROR;
    if (msg.includes("auth/popup-closed-by-user") || msg.includes("auth/cancelled-popup-request")) {
      return;
    }
    toast.error(msg, {
      autoClose: 2500,
      position: "bottom-right",
      theme: "colored",
      pauseOnHover: false,
    });
  }
}
