import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
// Layouts
import MainLayout from "./shared/MainLayout";
import AdminLayout from "./shared/AdminLayout";
// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/shopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
// Auth
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage"
// Admin
import DashboardPage from "./admin/DashboardPage";
import AdminProductPage from "./admin/AdminProductPage";
import AdminOrderPage from "./admin/AdminOrderPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import { use } from "react";


const useAuth = () => {
  return {
    isAuthenticated: true,
    role: "admin", 
  };
}
// ─────────────────────────────────────────────
// PROTECTED ROUTE — must be logged in
// ─────────────────────────────────────────────
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

// ─────────────────────────────────────────────
// ADMIN ROUTE — must be logged in AND be admin
// ─────────────────────────────────────────────
const AdminRoute = () => {
    const { isAuthenticated, role } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }   
    if (role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
};
// ─────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },

      // ── PROTECTED (customer) ROUTES ──
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/orders",
            element: <OrderPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },

  // ── ADMIN ROUTES ──
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <DashboardPage />,
          },
          {
            path: "/admin/products",
            element: <AdminProductPage />,
          },
          {
            path: "/admin/orders",
            element: <AdminOrderPage />,
          },
          {
            path: "/admin/users",
            element: <AdminUsersPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
