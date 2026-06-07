import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import MainLayout from "./shared/MainLayout";
import AdminLayout from "./shared/AdminLayout";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import DashboardPage from "./admin/DashboardPage";
import AdminProductPage from "./admin/AdminProductPage";
import AdminOrderPage from "./admin/AdminOrderPage";
import AdminUsersPage from "./admin/AdminUsersPage";

// ── MOCK AUTH — swap for real context when backend is ready ──
function useAuth() {
  return { isAuthenticated: true, role: "admin" };
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function AdminRoute() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}

const router = createBrowserRouter([
  // ── PUBLIC + CUSTOMER — inside MainLayout (Navbar + Footer) ──
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/cart", element: <CartPage /> },

      // Protected — must be logged in
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/order-success", element: <OrderSuccessPage /> },
          { path: "/orders", element: <OrderPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },

  // ── AUTH — standalone pages (no Navbar/Footer) ──
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // ── ADMIN — AdminLayout (sidebar only) ──
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <DashboardPage /> },
          { path: "/admin/products", element: <AdminProductPage /> },
          { path: "/admin/orders", element: <AdminOrderPage /> },
          { path: "/admin/users", element: <AdminUsersPage /> },
        ],
      },
    ],
  },

  // ── 404 ──
  // ✅ CORRECT
  { path: "*", element: <NotFoundPage /> },
  
]);

export default router;
