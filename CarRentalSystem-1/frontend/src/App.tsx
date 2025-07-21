import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Admin from "./pages/Admin";
import FareEstimatorPage from "./pages/FareEstimator";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import PaymentPage from "./pages/PaymentPage"; // ✅ Route param version

const queryClient = new QueryClient();

// ✅ Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ✅ Admin-only route wrapper
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  if (!authState.isAuthenticated || authState.user?.email !== "admin@gmail.com") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ✅ Guest-only route wrapper
const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  if (authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// ✅ Application Routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/fare-estimator" element={<FareEstimatorPage />} />

      {/* Guest-only Routes */}
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute>
            <Register />
          </GuestOnlyRoute>
        }
      />

      {/* Password Reset (Open Access) */}
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:bookingId/:amount"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      {/* Admin-only Route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ✅ App Wrapper
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
