import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx";
import PetHome from "./pages/PetHome.jsx";
import PhoneHome from "./pages/PhoneHome.jsx";


import Designer from "./pages/Designer.jsx";
import PetDesigner from "./pages/PetDesigner.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PasswordResetSuccess from "./pages/PasswordResetSuccess.jsx";
import Success from "./pages/Success.jsx";
import Checkout from "./pages/Checkout.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import OrderList from "./admin/OrderList.jsx";
import PhoneModelManager from "./admin/PhoneModelManager.jsx";
import PetProductManager from "./admin/PetProductManager.jsx";
import AdminPetOrders from "./admin/AdminPetOrders.jsx";
import AdminPetOrderDetail from "./admin/AdminPetOrderDetail.jsx";
import AdminPaymentDetails from "./admin/AdminPaymentDetails.jsx";
import UserManager from "./admin/UserManager.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import MyOrders from "./pages/user/MyOrders.jsx";
import MyCart from "./pages/user/MyCart.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import StoreLocator from "./pages/StoreLocator.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/blogpost/BlogPost.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";


const ADMIN_STORAGE_KEY = "cpc_admin_token";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const UserRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#fe7245]"></div>
          <p className="text-sm font-medium text-slate-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");
  const isDashboardRoute = isAdminRoute || isUserRoute;

  return (
    <>
      <ScrollToTop />
      {!isDashboardRoute && <Navbar />}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet-center" element={<PetHome />} />
        <Route path="/custom-mobilecase" element={<PhoneHome />} />


        <Route path="/case-design" element={<Designer />} />
        <Route path="/pet-design" element={<PetDesigner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-success" element={<PasswordResetSuccess />} />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />


        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/pet-orders"
          element={
            <AdminRoute>
              <AdminPetOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/pet-orders/:id"
          element={
            <AdminRoute>
              <AdminPetOrderDetail />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/models"
          element={
            <AdminRoute>
              <PhoneModelManager />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/pet-products"
          element={
            <AdminRoute>
              <PetProductManager />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManager />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <AdminPaymentDetails />
            </AdminRoute>
          }
        />

        {/* User Panel Routes */}
        <Route
          path="/user/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <UserRoute>
              <MyOrders />
            </UserRoute>
          }
        />
        <Route
          path="/user/cart"
          element={
            <UserRoute>
              <MyCart />
            </UserRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default App;

