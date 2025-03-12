"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastClient({ message }: { message: string }) {
  if (message) {
    toast.warn(message, { autoClose: 5000 });
  }

  return <ToastContainer />;
}
