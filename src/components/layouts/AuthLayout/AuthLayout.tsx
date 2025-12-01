import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
  return (
    <>
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
      <Outlet />
    </>
  );
}

export default AuthLayout;
