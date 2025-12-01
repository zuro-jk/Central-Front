import { PublicLayout } from "@/components/layouts";
import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import NotFound from "@/components/NotFound";
import DashboardAdmin from "@/features/admin/dashboard/Dashboard";
import ProductsAdmin from "@/features/admin/products/Products";
import ReportsAdmin from "@/features/admin/reports/Reports";
import UsersAdmin from "@/features/admin/users/Users";
import Login from "@/features/auth/login/Login";
import Signup from "@/features/auth/signup/Signup";
import SalesCashier from "@/features/cashier/sales/Sales";
import OrdersChef from "@/features/chef/orders/Orders";
import CheckoutPage from "@/features/client/checkout/Checkout";
import Contact from "@/features/client/contact/Contact";
import Home from "@/features/client/home/Home";
import Menu from "@/features/client/menu/Menu";
import PurchaseHistory from "@/features/client/orders/PurchaseHistory";
import PaymentSuccess from "@/features/client/payment-success/PaymentSuccess";
import PaymentValidate from "@/features/client/payment-success/PaymentValidate";
import Profile from "@/features/client/profile/Profile";
import Reservations from "@/features/client/reservations/Reservations";
import ProductsSupplier from "@/features/supplier/products/Products";
import PageWaiter from "@/features/waiter/pageWaiter";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==================== PÚBLICAS ==================== */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/menu"
          element={<Menu />}
        />
        <Route
          path="/reservations"
          element={<Reservations />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/my-orders"
          element={<PurchaseHistory />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* AHORA ES PÚBLICA: El componente maneja la restricción interna */}
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/payment/validate"
          element={<PaymentValidate />}
        />

        <Route
          path="/payment/success"
          element={<PaymentSuccess />}
        />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route
          path="/auth/login"
          element={<Login />}
        />
        <Route
          path="/auth/signup"
          element={<Signup />}
        />
      </Route>

      {/* ==================== PRIVADAS ==================== */}

      {/* ADMIN */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<DashboardAdmin />}
          />
          <Route
            path="/admin/products"
            element={<ProductsAdmin />}
          />
          <Route
            path="/admin/reports"
            element={<ReportsAdmin />}
          />
          <Route
            path="/admin/users"
            element={<UsersAdmin />}
          />
        </Route>
      </Route>

      {/* CHEF */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_CHEF"]} />}>
        <Route
          path="/chef/orders"
          element={<OrdersChef />}
        />
      </Route>

      {/* CASHIER */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_CASHIER"]} />}>
        <Route
          path="/cashier/sales"
          element={<SalesCashier />}
        />
      </Route>

      {/* SUPPLIER */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_SUPPLIER"]} />}>
        <Route
          path="/supplier/products"
          element={<ProductsSupplier />}
        />
      </Route>

      {/* WAITER */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_WAITER"]} />}>
        <Route
          path="/waiter/*"
          element={<PageWaiter />}
        />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}
