import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp } = useAuth();

  const initialEmail = location.state?.email || "";
  const [step, setStep] = useState<"request" | "verify">(initialEmail ? "verify" : "request");
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email");
      setStep("verify");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!email || !otp || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const success = await verifyOtp(email, otp, newPassword);
    if (success) {
      toast.success("Password reset successful! Redirecting to login...");
     setTimeout(() => {
      setEmail("");
      setOtp("");
      setNewPassword("");
      if (typeof window !== "undefined") {
      localStorage.removeItem("authUser"); // if you stored auth in localStorage
    }

    // You may also reset AuthContext if applicable
    // setAuthState({ isAuthenticated: false, user: null });

    window.location.href = "/login"; // ✅ Force full redirect to avoid context issues
  }, 1500);
  }
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-rental-blue mb-6">
          {step === "request" ? "Request OTP" : "Verify OTP & Reset Password"}
        </h2>

        {step === "request" ? (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="mt-4 w-full bg-rental-blue text-white"
              onClick={requestOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" value={email} disabled />

            <label className="block text-sm font-medium mt-4 mb-1">OTP</label>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <label className="block text-sm font-medium mt-4 mb-1">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Button
              className="mt-4 w-full bg-green-600 text-white"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
