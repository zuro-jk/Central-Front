import PublicFooter from "@/components/Footer/PublicFooter";
import PublicHeader from "@/components/Header/PublicHeader";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <PublicHeader />

      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
